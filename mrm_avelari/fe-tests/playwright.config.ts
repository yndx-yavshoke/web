import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './tests/setup/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/*.setup.ts',
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
