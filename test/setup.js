import fs from "fs/promises";
import { build } from "esbuild";
import { polyfillNode } from "esbuild-plugin-polyfill-node";

/**
 * The abstract-level test suite uses node-style imports and
 * the node:events built-in. In order to run the suite in the
 * worker runtime, we bundle the suite with esbuild.
 */
export async function setup() {
  console.log("Building test suite...");
  await build({
    entryPoints: ["./test/suite.js"],
    bundle: true,
    format: "esm",
    outfile: "./test/suite.bundle.js",
    plugins: [
      polyfillNode({
        events: true,
      }),
    ],
  });
}

export async function teardown() {
  console.log("Cleaning up test suite...");
  await fs.unlink("./test/suite.bundle.js");
}
