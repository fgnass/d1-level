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

  it("puts and gets json values", async () => {
    const level = new D1Level<string, string | number | object>(env.D1, {
      valueEncoding: "json",
    });
    await level.open();
    await level.put("string", "Hello World!");
    expect(await level.get("string")).toBe("Hello World!");
    await level.put("number", 123);
    expect(await level.get("number")).toBe(123);
    await level.put("obj", { hello: "world", year: 2024 });
    expect(await level.get("obj")).toStrictEqual({
      hello: "world",
      year: 2024,
    });
  });

  it("creates the constructor without a binding", async () => {
    const level = new D1Level<string, string | number | object>(null, {
      valueEncoding: "json",
    });
    setTimeout(async () => {
      level.d1 = env.D1;
      await level.put("string", "Hello World!");
      expect(await level.get("string")).toBe("Hello World!");
      await level.put("number", 123);
      expect(await level.get("number")).toBe(123);
      await level.put("obj", { hello: "world", year: 2024 });
      expect(await level.get("obj")).toStrictEqual({
        hello: "world",
        year: 2024,
      });
    }, 100);
  });

  // The bundled version is created in setup.js:
  const { suite } = await import("./" + "suite.bundle.js");
  suite(it, assert, env);
});
