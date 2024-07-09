import { D1Level } from ".";

const BASE_URL = "https://api.cloudflare.com/client/v4";

interface D1Endpoint {
  accountId: string;
  databaseId: string;
  apiToken: string;
}

export { D1Level };

export class RemoteD1Level extends D1Level {
  constructor(endpoint?: D1Endpoint | null) {
    super(
      new RemoteD1(
        endpoint ?? {
          accountId: process.env.D1_ACCOUNT_ID,
          databaseId: process.env.D1_DATABASE_ID,
          apiToken: process.env.D1_API_TOKEN,
        }
      )
    );
  }
}

export class RemoteD1 implements D1Database {
  constructor(private endpoint: D1Endpoint) {}

  prepare(query: string): D1PreparedStatement {
    return new RestPreparedStatement(this.endpoint, query);
  }

  async exec(query: string): Promise<D1ExecResult> {
    const res = await fetchQuery(this.endpoint, query);
    return {
      count: 1,
      duration: res.result[0].meta.duration,
    };
  }

  batch<T = unknown>(
    statements: D1PreparedStatement[]
  ): Promise<D1Result<T>[]> {
    return Promise.all(statements.map((stmt) => stmt.all<T>()));
  }

  dump(): Promise<ArrayBuffer> {
    throw new Error("Method not implemented.");
  }
}

interface Message {
  code: number; // >=1000
  message: string;
}

interface QueryResponse<T> {
  result: {
    meta: D1Meta;
    results: T;
    success: boolean;
  }[];
  errors: Message[];
  messages: Message[];
  success: boolean;
}

async function fetchQuery<T>(
  { accountId, databaseId, apiToken }: D1Endpoint,
  sql: string,
  params?: unknown[],
  raw?: boolean
): Promise<QueryResponse<T>> {
  const url = `${BASE_URL}/accounts/${accountId}/d1/database/${databaseId}/${
    raw ? "raw" : "query"
  }`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + apiToken,
  };

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      params: params ?? [],
      sql,
    }),
  });
  const body = await res.json<QueryResponse<T>>();
  if (!body.success) {
    throw new Error(body.errors[0].message);
  }
  return body;
}

class RestPreparedStatement implements D1PreparedStatement {
  private params: unknown[];
  constructor(private endpoint: D1Endpoint, private sql: string) {}

  bind(...params: unknown[]) {
    this.params = params;
    return this;
  }

  async first(colName?: string) {
    const all = await this.all();
    const row = all.results[0];
    return colName ? row?.[colName] : row;
  }

  async all<T = Record<string, unknown>>(): Promise<D1Result<T>> {
    const res = await fetchQuery<T[]>(this.endpoint, this.sql, this.params);
    const { results, meta } = res.result[0];
    return {
      success: true,
      meta: { ...meta },
      results,
    };
  }

  async raw<T = unknown[]>(options: {
    columnNames: true;
  }): Promise<[string[], ...T[]]>;
  async raw<T = unknown[]>(options?: { columnNames?: false }): Promise<T[]>;
  async raw<T = unknown[]>(options?: { columnNames?: boolean }) {
    const res = await fetchQuery<{ columns: string[]; rows: T[] }>(
      this.endpoint,
      this.sql,
      this.params,
      true
    );
    const { columns, rows } = res.result[0].results;
    if (options?.columnNames) {
      return [columns, ...rows];
    } else {
      return rows;
    }
  }

  async run() {
    const res = await fetchQuery(this.endpoint, this.sql, this.params);
    const { success, errors, result } = res;
    if (!success) {
      throw new Error(errors[0].message);
    }
    return {
      success,
      meta: { ...result[0].meta },
    };
  }
}
