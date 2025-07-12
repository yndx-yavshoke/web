import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { TEST_UNREGISTERED_EMAIL, TEST_RANDOM_PASSWORD } from '../constants/env';
import { COLORS } from '../constants/colors';
import { AUTH_MSG, MSG } from '../constants/messages';

test.describe('Авторизация зарегистрированного пользователя', () => {
  test('Succesfull auth with valid user credentials', async ({ authPage, testEmail, testPassword }) => {
    await authPage.open();
    await authPage.login(testEmail, testPassword);

    await expect(authPage.page.getByTestId('user-logout-button')).toBeVisible();
  });
});

test.describe('Авторизация незарегистрированного пользователя', () => {
  test('Error on login with non-existent user', async ({ authPage }) => {
    await authPage.open();
    await authPage.login(TEST_UNREGISTERED_EMAIL, TEST_RANDOM_PASSWORD);

    const error = authPage.page.getByText(AUTH_MSG.INVALID_CREDENTIALS);
    await expect(error).toBeVisible();
    await expect(authPage.emailInput).toHaveCSS('border-color', COLORS.RED);
    await expect(authPage.passwordInput).toHaveCSS('border-color', COLORS.RED);
  });
});

test.describe('Обработка ошибок при пустых полях', () => {
  test('Error on login with empty fields', async ({ authPage }) => {
    await authPage.open();
    await authPage.login('', '');

    await expect(authPage.page.getByText(MSG.EMPTY_EMAIL)).toBeVisible();
    await expect(authPage.emailInput).toHaveCSS('border-color', COLORS.RED);

    await expect(authPage.page.getByText(MSG.EMPTY_PASSWORD)).toBeVisible();
    await expect(authPage.passwordInput).toHaveCSS('border-color', COLORS.RED);
  });
});

test.describe('Обработка ошибок при неверном пароле', () => {
  test('Error on login with valid email and wrong password', async ({ authPage, testEmail }) => {
    await authPage.open();
    await authPage.login(testEmail, TEST_RANDOM_PASSWORD);

    await expect(authPage.page.getByText(AUTH_MSG.INVALID_CREDENTIALS)).toBeVisible();
    await expect(authPage.emailInput).toHaveCSS('border-color', COLORS.RED);
    await expect(authPage.passwordInput).toHaveCSS('border-color', COLORS.RED);
  });
});

test.describe('Проверка UI элементов страницы авторизации и навигации', () => {
  test.beforeEach(async ({ authPage }) => {
    await authPage.open();
  });

  test('All main elements are visible and correct', async ({ authPage }) => {
    await authPage.expectUI();
  });

  test('Navigate to registration page on clicking "Register" button', async ({ authPage }) => {
    await authPage.clickRegisterButton();

    await expect(authPage.page).toHaveURL(/register/);
  });

  test('Navigate back on clicking "Back" button', async ({ authPage }) => {
    await authPage.clickBackButton();

    await expect(authPage.page).toHaveURL('/');
  });
});
