import runTests from "abstract-level/test";
import { D1Level } from "../src";

export function suite(it, assert, env) {
  // The test suite requires a tape-style interface:
  const test = (name, specFn) => {
    it(
      name,
      () =>
        new Promise((resolve) => {
          let planned = 0;
          let count = 0;
          const track =
            (fn) =>
            (...args) => {
              count++;
              if (planned > 0 && count >= planned) {
                resolve();
              }
              return fn(...args);
            };

          Promise.resolve(
            specFn({
              plan: (num) => {
                planned = num;
              },
              end: track(() => {}),
              pass: track(() => {}),
              same: track(assert.deepEqual),
              fail: track(assert.fail),
              is: track(assert.equal),
              isNot: track(assert.notEqual),
              eq: track(assert.equal),
              ok: track(assert.ok),
              ifError: track(assert.ifError),
              error: track(assert.ifError),
              throws: track((fn, expected, msg = "should have thrown") => {
                try {
                  fn();
                  assert.fail(msg);
                } catch (err) {
                  assert.ok(expected(err), msg);
                }
              }),
            })
          ).then(() => {
            if (planned === 0 || count >= planned) {
              resolve();
            }
          });
        })
    );
  };

  let i = 0;
  runTests({
    test,
    factory(options) {
      return new D1Level(env.D1, { name: `kv${i++}`, ...options });
    },
  });
}
