import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { getTestUserEmail, getTestUserPassword } from "../utils/env";
import { generateRandomEmail, generateRandomPassword } from "../utils/data-generator";

test.describe('Авторизация зарегистрированного пользователя', () => {
  test('user_should_auth', async ({ loginPage }) => {
    await test.step('Открыть страницу авторизации', async () => {
      await loginPage.open();
    });
    await test.step('Ввести корректные данные и войти', async () => {
      await loginPage.login(getTestUserEmail(), getTestUserPassword());
    });
    await test.step('Проверить, что пользователь залогинен', async () => {
      await expect(loginPage.page.getByTestId('user-logout-button'), 'Кнопка выхода должна быть видимой').toBeVisible();
    });
  });
});

test.describe('Авторизация незарегистрированного пользователя', () => {
  test('user_should_not_auth_with_wrong_email', async ({ loginPage }) => {
    await test.step('Открыть страницу авторизации', async () => {
      await loginPage.open();
    });
    await test.step('Ввести несуществующий email', async () => {
      await loginPage.login(generateRandomEmail(), generateRandomPassword());
    });
    await test.step('Проверить ошибку о несуществующем пользователе', async () => {
      await expect(loginPage.page.getByText('Неправильный логин или пароль'), 'Должно появиться сообщение об ошибке ввода').toBeVisible();
    });
  });
});

test.describe('Авторизация с неправильным паролем', () => {
  test('user_should_not_auth_with_wrong_password', async ({ loginPage }) => {
    await test.step('Открыть страницу авторизации', async () => {
      await loginPage.open();
    });
    await test.step('Ввести правильный email и неверный пароль', async () => {
      await loginPage.login(getTestUserEmail(), generateRandomPassword());
    });
    await test.step('Проверить ошибку о неверном пароле', async () => {
      await expect(loginPage.page.getByText('Неправильный логин или пароль'), 'Должно появиться сообщение об ошибке').toBeVisible();
    });
  });
});

test.describe('Проверка элементов страницы авторизации', () => {
  test('login_page_should_contain', async ({ loginPage }) => {
    await test.step('Открыть страницу авторизации', async () => {
      await loginPage.open();
    });
    await test.step('Проверить элементы формы', async () => {
      await expect.soft(loginPage.title, 'Заголовок формы авторизации должен быть видимым').toBeVisible();
      await expect.soft(loginPage.loginInput, 'Поле email должно быть видно').toBeVisible();
      await expect.soft(loginPage.loginInput, 'Плейсхолдер email должен быть Email')
        .toHaveAttribute('placeholder', 'Email');
      await expect.soft(loginPage.passwordInput, 'Поле пароля должно быть видно').toBeVisible();
      await expect.soft(loginPage.passwordInput, 'Плейсхолдер пароля должен быть Пароль')
        .toHaveAttribute('placeholder', 'Пароль');
      await expect.soft(loginPage.loginButton, 'Кнопка входа должна быть видимой').toBeVisible();
      await expect.soft(loginPage.loginButton, 'Текст кнопки входа должен быть В шок')
        .toHaveText('В шок');
      await expect.soft(loginPage.loginBackButton, 'Кнопка возврата должна быть видимой').toBeVisible();
      await expect.soft(loginPage.loginBackButton, 'Текст кнопки возврата должен быть Назад')
        .toHaveText('Назад');
      await expect.soft(loginPage.toRegisterButton, 'Кнопка регистрации должна быть видимой').toBeVisible();
      await expect.soft(loginPage.toRegisterButton, 'Текст кнопки регистрации должен быть Регистрация')
        .toHaveText('Регистрация');
    });
  });
});