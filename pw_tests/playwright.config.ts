import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 1,

  reporter: [
    ['html', { open: 'never' }],
    ['html-reporter/playwright', {
      enabled: true,
      path:    'html-report',
      defaultView: 'failed'
    }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }],
    ['line']
  ],
  use: {
    baseURL: 'https://yavshok.ru',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup']
    },
    {
      name: 'setup',
      use: { ...devices['Desktop Chrome'], },
      testMatch: '**/*.setup.ts'
    }
  ],
});