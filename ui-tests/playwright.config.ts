import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["line"],
    ["allure-playwright"],
    [
      "html-reporter/playwright",
      {
        enabled: true,
        defaultView: "failed",
        path: "html-report",
      },
    ],
  ],
  use: {
    baseURL: "https://yavshok.ru",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "no-cookie-user",
      use: {
        ...devices["Desktop Chrome"],
      },
      testMatch: /.*\.spec\.ts/,
      testIgnore: /.*user-profile.spec\.ts/,
    },
    {
      name: "with-cookie-user",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "./storage/.auth/user.json",
      },
      testMatch: /.*user-profile.spec\.ts/,
      dependencies: ["setup"],
    },
  ],
});
