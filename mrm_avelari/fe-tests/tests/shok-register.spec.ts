import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { faker } from '@faker-js/faker';
import { TEST_USER_EMAIL } from '../constants/env';
import { REG_MSG } from '../constants/messages';
import { BASE_URL } from '../constants/env';

test.describe('Регистрация пользователя', () => {
  test('Succesfull registration with valid user credentials', async ({ registerPage }) => {
    await test.step(`Открыть страницу регистрации: ${BASE_URL}/register`, async () => {
      await registerPage.open();
    });

    const email = faker.internet.email();
    const password = faker.internet.password();
    const age = faker.number.int({ min: 0, max: 99 }).toString();

    await test.step(`Ввести email: ${email}, пароль и возраст: ${age}`, async () => {
      await registerPage.register(email, password, age);
    });

    await test.step('Проверить, что пользователь залогинен (отображается кнопка выхода)', async () => {
      await expect(registerPage.page.getByTestId('user-logout-button')).toBeVisible();
    });
  });
});

test.describe('Регистрация пользователя с уже существующим email', () => {
  test('Succesfull registration with valid user credentials', async ({ registerPage }) => {
    await test.step(`Открыть страницу регистрации: ${BASE_URL}/register`, async () => {
      await registerPage.open();
    });

    const email = TEST_USER_EMAIL;
    const password = faker.internet.password();
    const age = faker.number.int({ min: 0, max: 99 }).toString();

    await test.step(`Ввести дублирующий email: ${email}, пароль и возраст: ${age}`, async () => {
      await registerPage.register(email, password, age);
    });

    await test.step('Проверить отображение ошибки дублирующего email', async () => {
      await expect(registerPage.page.getByText(REG_MSG.errDuplicateEmail)).toBeVisible();
    });
  });
});

test.describe('Проверка UI элементов страницы регистрации и навигации', () => {
  test.beforeEach(async ({ registerPage }) => {
    await test.step(`Открыть страницу регистрации: ${BASE_URL}/register`, async () => {
      await registerPage.open();
    });
  });

  test('All main elements are visible and correct', async ({ registerPage }) => {
    await test.step('Проверить наличие основных UI-элементов', async () => {
      await registerPage.expectUI();
    });
  });

  test('Navigate back on clicking "Back" button', async ({ registerPage }) => {
    await test.step('Нажать кнопку "Назад"', async () => {
      await registerPage.clickBackButton();
    });

    await test.step(`Проверить, что URL соответствует ${BASE_URL}/login`, async () => {
      await expect(registerPage.page).toHaveURL(/\/login/);
    });
  });
});
