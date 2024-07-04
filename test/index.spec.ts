import { env } from "cloudflare:test";
import { describe, it, expect, assert } from "vitest";
import { D1Level } from "../src";

describe("D1Level", async () => {
  it("puts and gets a value", async () => {
    const level = new D1Level(env.D1);
    await level.open();
    await level.put("value", "Hello World!");
    expect(await level.get("value")).toBe("Hello World!");
    await level.put("value", "foo");
    expect(await level.get("value")).toBe("foo");
    expect(await level.getMany(["value"])).toEqual(["foo"]);
    await level.del("value");
    expect(await level.get("value")).toBe(undefined);
  });

  // The bundled version is created in setup.js:
  const { suite } = await import("./" + "suite.bundle.js");
  suite(it, assert, env);
});
