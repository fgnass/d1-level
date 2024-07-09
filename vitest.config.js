import "dotenv/config";
import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

const { accountId, databaseId, apiToken } = process.env;

const bindings =
  accountId && databaseId && apiToken
    ? { accountId, databaseId, apiToken }
    : undefined;

export default defineWorkersConfig({
  test: {
    globalSetup: ["./test/setup.js"],
    testTimeout: 10000,
    poolOptions: {
      workers: {
        singleWorker: true,
        isolatedStorage: false,
        wrangler: { configPath: "./wrangler.toml" },
        miniflare: {
          bindings,
          d1Databases: ["D1"],
        },
      },
    },
  },
});
