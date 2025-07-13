import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './fe-tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,

  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],

  use: {
    baseURL: 'https://yavshok.ru',
    trace: 'on-first-retry',
    headless: false,
  },

  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
      use: {
        ...devices['Desktop Chrome'],
        headless: true
      },
    },
    {
      name: 'no-auth',
      testMatch: '**/*public.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
      },
    },
      {
      name: 'auth',
      testMatch: '**/*reg.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.resolve(__dirname, './.auth/user.json'),
        headless: false,
      },
    },
  ],
});
