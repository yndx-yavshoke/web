import { defineConfig, devices } from '@playwright/test';
import { config } from './tests/utils/data-env';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Запуск тестов в файлах параллельно */
  fullyParallel: true,
  
  /* Запрет использования test.only в CI */
  forbidOnly: !!process.env.CI,
  
  /* Повторные попытки только в CI */
  retries: process.env.CI ? 2 : 0,
  
  /* Отключение параллельных тестов в CI */
  workers: process.env.CI ? 1 : undefined,
  
  /* Репортер для отчетов */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
      categories: true,
      attachments: true
    }]
  ],
  
  /* Общие настройки для всех проектов */
  use: {
    /* Базовый URL для действий типа `await page.goto('/')` */
    baseURL: config.baseURL,

    /* Сбор трейса при повторных попытках */
    trace: 'on-first-retry',
    
    /* Скриншоты только при неудаче */
    screenshot: 'only-on-failure',
    
    /* Видео только при неудаче */
    video: 'retain-on-failure',
    
    /* Таймаут для действий */
    actionTimeout: 10000,
    
    /* Таймаут для навигации */
    navigationTimeout: 30000,
  },

  /* Настройка проектов для основных браузеров */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Тестирование мобильных устройств */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Тестирование брендовых браузеров */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Запуск локального dev сервера перед тестами */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
}); 