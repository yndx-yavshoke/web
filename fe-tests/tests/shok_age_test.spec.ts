import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test.use({ storageState: 'tests/setup/auth/user.json' });

const flagsUrl = 'https://api.yavshok.ru/experiments';

const ageMocks = {
  young: {
    "flags": {
      "age": {
        "enabled": true,
        "young": { "from": 0, "to": 21 },
        "adult": { "from": 22, "to": 68 },
        "old": { "from": 69, "to": 99 },
        "oldFrom": 35,
        "youngFrom": 2
      }
    }
  },
  adult: {
    "flags": {
      "age": {
        "enabled": true,
        "young": { "from": 0, "to": 21 },
        "adult": { "from": 22, "to": 68 },
        "old": { "from": 69, "to": 99 },
        "oldFrom": 69,
        "youngFrom": 2
      }
    }
  },
  old: {
    "flags": {
      "age": {
        "enabled": true,
        "young": { "from": 0, "to": 21 },
        "adult": { "from": 22, "to": 68 },
        "old": { "from": 69, "to": 99 },
        "oldFrom": 12,
        "youngFrom": 2
      }
    }
  }
};

test('Показывает статус молодого котика', async ({ page }) => {
  await test.step('Перейти на главную страницу', async () => {
    await page.goto('/');
  });

  await test.step('Замокать API с настройками для молодого котика', async () => {
    await page.route(flagsUrl, route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(ageMocks.young)
    }));
  });

  await test.step('Проверить отображение статуса', async () => {
    await expect(page.getByTestId('main-email-input')).not.toBeVisible();
    await expect(page.getByText("Ты молоденький котик", { exact: true })).toBeVisible();
  });
});

test.skip('Показывает статус взрослого котика', async ({ page }) => {
  await test.step('Перейти в профиль', async () => {
    await page.goto('/');
  });

  await test.step('Замокать API с настройками для взрослого котика', async () => {
    await page.route(flagsUrl, route => route.fulfill({
      status: 200,
      body: JSON.stringify(ageMocks.adult)
    }));
  });

  await test.step('Проверить отображение статуса', async () => {
    await expect(page.getByTestId('main-email-input')).not.toBeVisible();
    await expect(page.getByText('Ты взрослый котик', { exact: true })).toBeVisible();
  });
});

test('Показывает статус старого котика', async ({ page }) => {
  await test.step('Перейти в профиль', async () => {
    await page.goto('/');
  });

  await test.step('Замокать API с настройками для старого котика', async () => {
    await page.route(flagsUrl, route => route.fulfill({
      status: 200,
      body: JSON.stringify(ageMocks.old)
    }));
  });

  await test.step('Проверить отображение статуса', async () => {
    await expect(page.getByTestId('main-email-input')).not.toBeVisible();
    await expect(page.getByText("Ты старый котик", { exact: true })).toBeVisible();
  });
});