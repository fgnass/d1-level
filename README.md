# d1-level

An [`abstract-level`](https://github.com/Level/abstract-level) database backed by [Cloudflare D1](https://developers.cloudflare.com/d1/).

✅ The implementation passes all 1000+ tests of `abstract-level/test` test suite.

### Usage

This is how you would use it inside a Cloudflare worker:

```ts
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

## License

MIT
