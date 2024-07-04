import runTests from "abstract-level/test";
import { D1Level } from "../src";

export function suite(it, assert, env) {
  // The test suite requires a tape-style interface:
  const test = (name, specFn) => {
    it(name, async () => {
      await specFn({
        plan: () => {},
        end: () => {},
        same: assert.deepEqual,
        fail: assert.fail,
        pass: assert.ok,
        is: assert.equal,
        isNot: assert.notEqual,
        eq: assert.equal,
        ok: assert.ok,
        throws: (fn, expected, msg = "should have thrown") => {
          try {
            fn();
            assert.fail(msg);
          } catch (err) {
            assert.ok(expected(err), msg);
          }
        },
      });
    });
  };

  let i = 0;
  runTests({
    test,
    factory(options) {
      return new D1Level(env.D1, { name: `kv${i++}`, ...options });
    },
  });
}
