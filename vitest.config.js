import "dotenv/config";
import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

const { accountId, databaseId, apiToken } = process.env;

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
          bindings: {
            accountId,
            databaseId,
            apiToken,
          },
          d1Databases: ["D1"],
        },
      },
    },
  },
});
