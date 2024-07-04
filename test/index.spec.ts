import { env } from "cloudflare:test";
import { describe, it, assert } from "vitest";

describe("D1Level", async () => {
  // The bundled version is created in setup.js:
  const { suite } = await import("./" + "suite.bundle.js");
  suite(it, assert, env);
});
