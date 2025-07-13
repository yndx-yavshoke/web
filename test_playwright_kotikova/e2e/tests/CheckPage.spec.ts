import { test, expect } from '@playwright/test';
import { generateUnregisteredEmail } from '../test-data/users';
import * as fs from 'fs';

const loadUserEmail = (): string => {
  const data = JSON.parse(fs.readFileSync('playwright/.auth/user.json', 'utf-8'));
  return data.email; 
};


test.describe('Проверка главной страницы', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Отображение поля email', async ({ page }) => {
    const emailInput = page.getByTestId('main-email-input');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('placeholder', 'Введите email');
  });

  test('Отображение кнопки проверки', async ({ page }) => {
    const checkButton = page.getByTestId('main-check-button');
    await expect(checkButton).toBeVisible();
    await expect(checkButton).toHaveText('Я в шоке?');
  });

  //
  test('Сообщение для незарегистрированного email', async ({ page }) => {
    const unregEmail = generateUnregisteredEmail();
    await page.getByTestId('main-email-input').fill(unregEmail);
    await page.getByTestId('main-check-button').click();
    await expect(page.getByText('Ты еще не в ШОКе')).toBeVisible();
  });
});

test.describe('Проверка зарегистрированного пользователя', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Появляется сообщение "Ты уже в ШОКе" для зарегистрированного пользователя', async ({ page }) => {
    const email = loadUserEmail();

    await page.goto('https://yavshok.ru');

    const logoutBtn = page.locator('[data-testid="user-logout-button"]');
    if (await logoutBtn.isVisible().catch(() => false)) {
      await logoutBtn.click();
      await page.goto('https://yavshok.ru'); 
    }

    await page.getByTestId('main-email-input').fill(email);
    await page.getByTestId('main-check-button').click();

    await expect(
      page.locator('div.css-146c3p1.r-xb2eav.r-117bsoe').filter({
        hasText: 'Ты уже в ШОКе',
      })
    ).toBeVisible();
  });
});
