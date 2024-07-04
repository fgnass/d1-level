import {
  AbstractBatchOperation,
  AbstractClearOptions,
  AbstractDatabaseOptions,
  AbstractIterator,
  AbstractIteratorOptions,
  AbstractLevel,
  AbstractOpenOptions,
} from "abstract-level";
import { RangeOptions } from "abstract-level/types/interfaces";

type BatchOperation = AbstractBatchOperation<D1Level, string, string>;
type D1LevelOptions<K, V> = AbstractDatabaseOptions<K, V> & {
  name?: string;
};

export class D1Level<K = string, V = string> extends AbstractLevel<
  string,
  K,
  V
> {
  private name: string;
  constructor(private d1: D1Database, options: D1LevelOptions<K, V> = {}) {
    const { name = "kv", ...abstractOptions } = options;
    const encodings = { utf8: true, json: false };
    super(
      {
        encodings,
        seek: false,
        snapshots: false,
        streams: false,
        permanence: true,
      },
      abstractOptions
    );
    this.name = name;
  }

  async _open({
    createIfMissing,
    errorIfExists,
    passive,
  }: AbstractOpenOptions) {
    if (!passive) {
      if (createIfMissing) {
        await this.d1.exec(
          `CREATE TABLE IF NOT EXISTS ${this.name} (key TEXT PRIMARY KEY, value TEXT)`
        );
      } else {
        try {
          await this.d1.exec(
            `CREATE TABLE ${this.name} (key TEXT PRIMARY KEY, value TEXT)`
          );
        } catch (err) {
          if (errorIfExists) {
            throw new LevelError("Table already exists", "LEVEL_ERROR_EXISTS");
          }
        }
      }
      await this.d1.exec(
        `CREATE INDEX IF NOT EXISTS idx_${this.name} ON ${this.name}(key)`
      );
    }
  }

  async _get(key: string) {
    const stmt = this.d1.prepare(
      `SELECT value FROM ${this.name} WHERE key = ?`
    );
    const value = await stmt.bind(key).first<string | null>("value");
    return value ?? undefined;
  }

  async _getMany(keys: string[]) {
    // D1 does not support binding arrays, so we have to use a query with placeholders:
    const params = keys.map(() => "?").join();
    const query = `SELECT * FROM ${this.name} WHERE key in (${params})`;
    const stmt = this.d1.prepare(query);
    const rows = await stmt.bind(...keys).all();
    // Maintain the order of keys:
    return keys.map(
      (key) => rows.results.find((row) => row.key === key)?.value
    );
  }

  async _put(key: string, value: string, options: any) {
    const stmt = this.d1.prepare(
      `INSERT INTO ${this.name} (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`
    );
    await stmt.bind(key, value).run();
  }

  async _del(key: string) {
    const stmt = this.d1.prepare(`DELETE FROM ${this.name} WHERE key = ?`);
    await stmt.bind(key).run();
  }

  async _batch(batch: BatchOperation[], options: any) {
    const statements = [];
    let curBatch: any[] = [];
    let curType: string | undefined = undefined;

    const addStatement = () => {
      if (curType === "put") {
        const params = curBatch.map(() => "(?, ?)").join(", ");
        const query = `INSERT INTO ${this.name} (key, value) VALUES ${params} ON CONFLICT(key) DO UPDATE SET value=excluded.value`;
        statements.push(this.d1.prepare(query).bind(...curBatch.flat()));
      } else if (curType === "del") {
        const params = curBatch.map(() => "?").join();
        const query = `DELETE FROM ${this.name} WHERE key IN (${params})`;
        statements.push(this.d1.prepare(query).bind(...curBatch));
      }
    };

    for (const op of batch) {
      if (curType === undefined) {
        // First operation
        curType = op.type;
      }
      if (curType !== op.type || curBatch.length >= 10) {
        // Different operation type
        addStatement();
        curBatch = [];
        curType = op.type;
      }
      if (op.type === "put") {
        curBatch.push([op.key, op.value]);
      } else if (op.type === "del") {
        curBatch.push(op.key);
      }
    }
    if (curBatch.length > 0) {
      addStatement();
    }
    if (statements.length) {
      try {
        await this.d1.batch(statements);
      } catch (err) {
        throw err;
      }
    }
  }

  async _clear(options: AbstractClearOptions<string>) {
    const { where, params } = rangeQuery({
      ...options,
      order: options.limit && options.limit !== -1,
    });
    try {
      await this.d1
        .prepare(`DELETE FROM ${this.name} ${where}`)
        .bind(...params)
        .run();
    } catch (err) {
      console.log("🚨 DELETE", where, options, params);
      throw err;
    }
  }

  _iterator(options: AbstractIteratorOptions<K, V>) {
    return new D1Iterator<K, V>(this, options, this.d1, this.name);
  }
}

function rangeQuery(options: RangeOptions<any> & { order?: boolean }) {
  const { gt, gte, lt, lte, order, reverse, limit } = options;
  const params: Array<string | number> = [];
  let where = "";
  if (gte !== undefined) {
    where += ` WHERE key >= ?`;
    params.push(gte);
  } else if (gt !== undefined) {
    where += ` WHERE key > ?`;
    params.push(gt);
  }

  if (lte !== undefined) {
    where += ` ${where ? "AND" : "WHERE"} key <= ?`;
    params.push(lte);
  } else if (lt !== undefined) {
    where += ` ${where ? "AND" : "WHERE"} key < ?`;
    params.push(lt);
  }

  if (order !== false) {
    if (reverse) {
      where += " ORDER BY key DESC";
    } else {
      where += " ORDER BY key ASC";
    }
  }

  if (limit && limit !== -1) {
    where += ` LIMIT ${limit}`;
  }

  return { where, params };
}

class D1Iterator<K, V> extends AbstractIterator<D1Level<K, V>, K, V> {
  private result?: string[][];
  private index = 0;
  constructor(
    db: D1Level<K, V>,
    private options: AbstractIteratorOptions<K, V>,
    private d1: D1Database,
    private name: string
  ) {
    super(db, options);
  }

  private async exec() {
    let query = `SELECT key, value FROM ${this.name}`;
    const { where, params } = rangeQuery(this.options);
    const stmt = this.d1.prepare(query + where).bind(...params);
    const rows = await stmt.all<{ key: string; value: string }>();
    return rows.results.map((row) => [row.key, row.value]);
  }

  async _next() {
    if (!this.result) {
      this.result = await this.exec();
    }
    const rows = this.result;
    if (this.index < rows.length) {
      return rows[this.index++];
    }
  }
}

class LevelError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
  }
}
