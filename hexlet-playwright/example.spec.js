// example.spec.js
const { test, expect } = require('@playwright/test');

test('Пример теста: проверка заголовка Google', async ({ page }) => {
  // Открываем страницу Google
  await page.goto('https://www.google.com');

  // Проверяем, что заголовок содержит слово "Google"
  await expect(page).toHaveTitle(/Google/);
});