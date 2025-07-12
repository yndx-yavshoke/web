import { test, expect } from '@playwright/test';

test.use({
  storageState: './auth-project/auth-project/auth.json'
});

test('Профиль: старый котик', async ({ page }) => {
  // Мокаем /experiments
  await page.route('**/experiments', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        flags: {
          age: {
            enabled: true,
            old: { from: 69, to: 99 }
          }
        }
      })
    });
  });

  // Загружаем сохранённую сессию в localStorage
  await page.context().addInitScript(() => {
    window.localStorage.setItem('UserData', JSON.stringify({
      id: 1306,
      email: 'qwe1qwe@mail.ru',
      name: 'Neko',
      age: 75
    }));
  });

  await page.goto('https://yavshok.ru/');

  // Проверяем статус
  await expect(page.getByText('Ты старый котик')).toBeVisible();
});
