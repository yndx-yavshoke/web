import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests', // Директория, содержащая тесты
  outputDir: './e2e/test-results', // Директория для результатов тестов
  reporter: [["line"], ["allure-playwright"]],
  globalSetup: require.resolve('./e2e/tests/auth.setup.ts'), // Глобальная настройка для аутентификации

  use: {
    baseURL: 'https://yavshok.ru/', // Базовый URL для всех тестов
    trace: 'on-first-retry', // Включить трассировку во время первой повторной попытки
  },

  projects: [
    {
      name: 'chromium', // Проект для тестирования в Chrome
      use: { 
        ...devices['Desktop Chrome'], // Настройки для устройства "Desktop Chrome"
      },}
  ]
});