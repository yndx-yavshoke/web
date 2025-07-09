import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { TEST_UNREGISTERED_EMAIL, TEST_RANDOM_PASSWORD } from '../fixtures/env';

const mock = {
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
      oldFrom: 26,
      youngFrom: 2,
    },
  },
};

test.describe('AUTORIZATION', () => {
  test('auth state', async ({ page }) => {
    await page.goto('/');

    await page.route('https://api.yavshok.ru/experiments', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(mock),
      });
    });

    await expect(page.getByTestId('main-email-input')).not.toBeVisible();
    await expect(page.getByText('Ты старый котик')).toBeVisible();
    await expect(page.getByTestId('user-logout-button')).toBeVisible();
  });

  test('Succesfull auth with valid user credentials', async ({
    authPage,
    testEmail,
    testPassword,
    page,
  }) => {
    await authPage.open();
    await authPage.login(testEmail, testPassword);

    await expect(page.getByTestId('user-logout-button')).toBeVisible();
  });

  test('Error on login with non-existent user', async ({ authPage }) => {
    await authPage.open();
    await authPage.login(TEST_UNREGISTERED_EMAIL, TEST_RANDOM_PASSWORD);

    const error = authPage.page.getByText('Неправильный логин или пароль');
    await expect(error).toBeVisible();

    await expect(authPage.emailInput).toHaveCSS(
      'border-color',
      'rgb(255, 0, 0)',
    );
    await expect(authPage.passwordInput).toHaveCSS(
      'border-color',
      'rgb(255, 0, 0)',
    );
  });

  test('Error on login with empty fields', async ({ authPage }) => {
    await authPage.open();
    await authPage.login('', '');

    const emailError = authPage.page.getByText('Введите email');
    await expect(emailError).toBeVisible();
    await expect(authPage.emailInput).toHaveCSS(
      'border-color',
      'rgb(255, 0, 0)',
    );

    const passwordError = authPage.page.getByText('Введите пароль');
    await expect(passwordError).toBeVisible();
    await expect(authPage.passwordInput).toHaveCSS(
      'border-color',
      'rgb(255, 0, 0)',
    );
  });

  test('Error on login with valid email and wrong password', async ({
    authPage,
    testEmail,
  }) => {
    await authPage.open();
    await authPage.login(testEmail, TEST_RANDOM_PASSWORD);

    const error = authPage.page.getByText('Неправильный логин или пароль');
    await expect(error).toBeVisible();

    await expect(authPage.emailInput).toHaveCSS(
      'border-color',
      'rgb(255, 0, 0)',
    );
    await expect(authPage.passwordInput).toHaveCSS(
      'border-color',
      'rgb(255, 0, 0)',
    );
  });
});
