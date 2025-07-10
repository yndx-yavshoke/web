import { test, expect } from '@playwright/test';

const mockExperiments = {
  flags: {
    age: {
      enabled: true,
      young: {
        from: 0,
        to: 21,
      },
      adult: {
        from: 22,
        to: 68,
      },
      old: {
        from: 69,
        to: 99,
      },
      oldFrom: 30,
      youngFrom: 2,
    },
  },
};

test.describe('Профиль пользователя 15 лет', () => {
  test.use({ storageState: 'tests/setup/auth/user1.json' });
  test('Проверка отображения статуса возраста', async ({ page }) => {
    await page.goto('/');
    await page.route('https://api.yavshok.ru/experiments', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockExperiments),
      });
    });

    await expect(page.getByText('Ты молоденький котик', { exact: true })).toBeVisible();
  });
});

test.describe('Профиль пользователя 70 лет', () => {
  test.use({ storageState: 'tests/setup/auth/user3.json' });
  test('Проверка отображения статуса возраста', async ({ page }) => {
    await page.goto('/');
    await page.route('https://api.yavshok.ru/experiments', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockExperiments),
      });
    });

    await expect(page.getByText('Ты старый котик', { exact: true })).toBeVisible();
  });
});
