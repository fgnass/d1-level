# d1-level

An [`abstract-level`](https://github.com/Level/abstract-level) database backed by [Cloudflare D1](https://developers.cloudflare.com/d1/).

✅ The implementation passes all 1000+ tests of `abstract-level/test` test suite.

### Usage

This is how you would use it inside a Cloudflare worker:

```ts
import { D1Level } from "d1-level";

export interface Env {
  D1: D1Database;
}

export default {
  async fetch(request, env) {
    const level = new D1Level(env.D1);
    await level.open();
    const value = await level.get("value");

    return new Response(`Hello ${value}!`);
  },
} satisfies ExportedHandler<Env>;
```

## Remote D1 support

The package also supports remote databases via the [D1 REST API](https://developers.cloudflare.com/api/operations/cloudflare-d1-query-database):

```ts
import { RemoteD1Level } from "d1-level/remote";

const level = new RemoteD1Level();
```

By default the `D1_ACCOUNT_ID`, `D1_DATABASE_ID` and `D1_API_TOKEN` environment variables are used. You can also pass these options to the constructor:

```ts
const level = new RemoteD1Level({
  accountId: "1234",
  databaseId: "5678",
  apiToken: "xxxx",
});
```

You can also leverage import conditions to write isomorphic code that uses the REST API when running in Node and the regular API otherwise:

```ts
import { D1Level } from "d1-level/conditional";

// D1Level will be RemoteD1Level when imported in Node and regular D1Level in all other environments.
```

## License

MIT
