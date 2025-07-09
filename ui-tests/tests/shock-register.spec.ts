import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { getTestUserEmail } from "../utils/env";
import { generateRandomEmail, generateRandomPassword, generateRandomAge } from "../utils/data-generator";

test.describe('Регистрация нового пользователя', () => {
  test('user_should_register', async ({ registerPage }) => {
    await test.step('Открыть страницу регистрации', async () => {
      await registerPage.open();
    });
    await test.step('Заполнить и отправить форму', async () => {
      await registerPage.register(
        generateRandomEmail(),
        generateRandomPassword(),
        generateRandomAge()
      );
    });
    await test.step('Проверить, что пользователь залогинен', async () => {
      await expect(registerPage.page.getByTestId('user-logout-button'), 'Кнопка выхода должна быть видимой').toBeVisible();
    });
  });
});

test.describe('Регистрация пользователя на существующий email', () => {
  test('user_should_not_register_with_the_same_email', async ({ registerPage }) => {
    await test.step('Открыть страницу регистрации', async () => {
      await registerPage.open();
    });
    await test.step('Заполнить форму с существующим email', async () => {
      await registerPage.register(
        getTestUserEmail(),
        generateRandomPassword(),
        generateRandomAge()
      );
    });
    await test.step('Проверить ошибку о существующем email', async () => {
      await expect(registerPage.page.getByText('Пользователь с таким email уже существует'), 'Должно появиться сообщение о существующем email').toBeVisible();
    });
  });
});

test.describe('Регистрация пользователя без пароля', () => {
  test('user_should_not_register_without_password', async ({ registerPage }) => {
    await test.step('Открыть страницу регистрации', async () => {
      await registerPage.open();
    });
    await test.step('Заполнить форму без пароля', async () => {
      await registerPage.register(
        generateRandomEmail(),
        '',
        generateRandomAge()
      );
    });
    await test.step('Проверить ошибку о пустом пароле', async () => {
      await expect(registerPage.page.getByText('Введите пароль'), 'Должно появиться сообщение о необходимости ввести пароль').toBeVisible();
    });
  });
});

test.describe('Регистрация пользователя без возраста', () => {
  test('user_should_not_register_without_age', async ({ registerPage }) => {
    await test.step('Открыть страницу регистрации', async () => {
      await registerPage.open();
    });
    await test.step('Заполнить форму без возраста', async () => {
      await registerPage.register(
        generateRandomEmail(),
        generateRandomPassword(),
        ''
      );
    });
    await test.step('Проверить ошибку о пустом возрасте', async () => {
      await expect(registerPage.page.getByText('Введите возраст'), 'Должно появиться сообщение о необходимости ввести возраст').toBeVisible();
    });
  });
});

test.describe('Регистрация пользователя без email', () => {
  test('user_should_not_register_without_email', async ({ registerPage }) => {
    await test.step('Открыть страницу регистрации', async () => {
      await registerPage.open();
    });
    await test.step('Заполнить форму без email', async () => {
      await registerPage.register(
        '',
        generateRandomPassword(),
        generateRandomAge()
      );
    });
    await test.step('Проверить ошибку о пустом email', async () => {
      await expect(registerPage.page.getByText('Введите email'), 'Должно появиться сообщение о необходимости ввести email').toBeVisible();
    });
  });
});

test.describe('Проверка элементов страницы регистрации', () => {
  test('register_page_should_contain', async ({ registerPage }) => {
    await test.step('Открыть страницу регистрации', async () => {
      await registerPage.open();
    });
    await test.step('Проверить элементы формы', async () => {
      await expect.soft(registerPage.title, 'Заголовок формы регистрации должен быть видимым').toBeVisible();
      await expect.soft(registerPage.emailInput, 'Поле email должно быть видно').toBeVisible();
      await expect.soft(registerPage.emailInput, 'Плейсхолдер email должен быть Email')
        .toHaveAttribute('placeholder', 'Email');
      await expect.soft(registerPage.passwordInput, 'Поле пароля должно быть видно').toBeVisible();
      await expect.soft(registerPage.passwordInput, 'Плейсхолдер пароля должен быть Пароль')
        .toHaveAttribute('placeholder', 'Пароль');
      await expect.soft(registerPage.ageInput, 'Поле возраста должно быть видно').toBeVisible();
      await expect.soft(registerPage.ageInput, 'Плейсхолдер возраста должен быть Возраст')
        .toHaveAttribute('placeholder', 'Возраст');
      await expect.soft(registerPage.registerButton, 'Кнопка регистрации должна быть видимой').toBeVisible();
      await expect.soft(registerPage.registerButton, 'Текст кнопки регистрации должен быть Зарегистрироваться')
        .toHaveText('Зарегистрироваться');
      await expect.soft(registerPage.toLoginButton, 'Кнопка возврата должна быть видимой').toBeVisible();
      await expect.soft(registerPage.toLoginButton, 'Текст кнопки возврата должен быть Назад')
        .toHaveText('Назад');
    });
  });
});