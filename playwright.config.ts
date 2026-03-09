import { defineConfig, devices } from "@playwright/test";

const LOCAL_BASE_URL =
  process.env.LOCAL_BASE_URL ?? "http://127.0.0.1:4321/sinnakodern/";
const DEPLOYED_BASE_URL =
  process.env.DEPLOYED_BASE_URL ?? "https://weholt.github.io/sinnakodern/";

export default defineConfig({
  testDir: "./tests",
  timeout: 120_000,
  fullyParallel: false,
  retries: 0,
  reporter: [["list"]],
  use: {
    trace: "retain-on-failure",
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "local",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: LOCAL_BASE_URL,
      },
    },
    {
      name: "deployed",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: DEPLOYED_BASE_URL,
      },
    },
  ],
  webServer: {
    command: "npm run dev -- --host --port 4321",
    url: LOCAL_BASE_URL,
    timeout: 120_000,
    reuseExistingServer: true,
  },
});
