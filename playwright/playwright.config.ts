import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [["html"], ["allure-playwright"]],
  use: {
    baseURL: 'https://yavshok.ru/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-with-setup',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
      testMatch: ['**/with-setup/*.spec.ts'],
    },
    {
      name: 'chromium-no-setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: ['**/no-setup/*.spec.ts'],
    },
    {
      name: 'setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/*.setup.ts',
    },
  ],
});
