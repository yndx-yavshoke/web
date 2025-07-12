import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { TEST_UNREGISTERED_EMAIL, TEST_RANDOM_PASSWORD } from '../constants/env';
import { COLORS } from '../constants/colors';
import { AUTH_MSG, MSG } from '../constants/messages';
import { BASE_URL } from '../constants/env';

test.describe('Авторизация зарегистрированного пользователя', () => {
  test('Succesfull auth with valid user credentials', async ({ authPage, testEmail, testPassword }) => {
    await test.step(`Отображается страница авторизации ${BASE_URL}/login`, async () => {
      await authPage.open();
    });

    await test.step('Ввести корректные данные и нажать "Войти"', async () => {
      await authPage.login(testEmail, testPassword);
    });

    await test.step('Проверить, что пользователь залогинен (наличие кнопки выхода)', async () => {
      await expect(authPage.page.getByTestId('user-logout-button')).toBeVisible();
    });
  });
});

test.describe('Авторизация незарегистрированного пользователя', () => {
  test('Error on login with non-existent user', async ({ authPage }) => {
    await test.step(`Отображается страница авторизации ${BASE_URL}/login`, async () => {
      await authPage.open();
    });

    await test.step('Ввести несуществующий email и пароль', async () => {
      await authPage.login(TEST_UNREGISTERED_EMAIL, TEST_RANDOM_PASSWORD);
    });

    await test.step('Проверить отображение ошибки и красную рамку', async () => {
      const error = authPage.page.getByText(AUTH_MSG.INVALID_CREDENTIALS);
      await expect(error).toBeVisible();
      await expect(authPage.emailInput).toHaveCSS('border-color', COLORS.RED);
      await expect(authPage.passwordInput).toHaveCSS('border-color', COLORS.RED);
    });
  });
});

test.describe('Обработка ошибок при пустых полях', () => {
  test('Error on login with empty fields', async ({ authPage }) => {
    await test.step(`Отображается страница авторизации ${BASE_URL}/login`, async () => {
      await authPage.open();
    });

    await test.step('Попытаться войти без ввода данных', async () => {
      await authPage.login('', '');
    });

    await test.step('Проверить валидацию и выделение ошибок', async () => {
      await expect(authPage.page.getByText(MSG.EMPTY_EMAIL)).toBeVisible();
      await expect(authPage.emailInput).toHaveCSS('border-color', COLORS.RED);

      await expect(authPage.page.getByText(MSG.EMPTY_PASSWORD)).toBeVisible();
      await expect(authPage.passwordInput).toHaveCSS('border-color', COLORS.RED);
    });
  });
});

test.describe('Обработка ошибок при неверном пароле', () => {
  test('Error on login with valid email and wrong password', async ({ authPage, testEmail }) => {
    await test.step(`Отображается страница авторизации ${BASE_URL}/login`, async () => {
      await authPage.open();
    });

    await test.step('Ввести корректный email и неверный пароль', async () => {
      await authPage.login(testEmail, TEST_RANDOM_PASSWORD);
    });

    await test.step('Проверить сообщение об ошибке и стили полей', async () => {
      await expect(authPage.page.getByText(AUTH_MSG.INVALID_CREDENTIALS)).toBeVisible();
      await expect(authPage.emailInput).toHaveCSS('border-color', COLORS.RED);
      await expect(authPage.passwordInput).toHaveCSS('border-color', COLORS.RED);
    });
  });
});

test.describe('Проверка UI элементов страницы авторизации и навигации', () => {
  test.beforeEach(async ({ authPage }) => {
    await test.step(`Отображается страница авторизации ${BASE_URL}/login`, async () => {
      await authPage.open();
    });
  });

  test('All main elements are visible and correct', async ({ authPage }) => {
    await test.step('Проверить видимость всех элементов формы', async () => {
      await authPage.expectUI();
    });
  });

  test('Navigate to registration page on clicking "Register" button', async ({ authPage }) => {
    await test.step('Нажать на кнопку "Зарегистрироваться"', async () => {
      await authPage.clickRegisterButton();
    });

    await test.step(`Отображается страница регистрации ${BASE_URL}/register`, async () => {
      await expect(authPage.page).toHaveURL(/register/);
    });

  });

  test('Navigate back on clicking "Back" button', async ({ authPage }) => {
    await test.step('Нажать кнопку "Назад"', async () => {
      await authPage.clickBackButton();
    });

    await test.step(`Отображается главная страница ${BASE_URL}/`, async () => {
      await expect(authPage.page).toHaveURL('/');
    });
  });
});