import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { TEST_USER_EMAIL, TEST_UNREGISTERED_EMAIL } from '../constants/env';
import { COLORS } from '../constants/colors';
import { BASE_URL } from '../constants/env';

test.describe('Проверка UI элементов главной страницы и навигации', () => {
  test.beforeEach(async ({ mainPage }) => {
    await test.step(`Открыта главная страница: ${BASE_URL}`, async () => {
      await mainPage.open();
    });
  });

  test('All main elements are visible and correct', async ({ mainPage }) => {
    await test.step('Проверяем наличие всех ключевых UI-элементов', async () => {
      await mainPage.expectUI();
    });
  });

  test('Navigate to login page on clicking "Login" button', async ({ mainPage }) => {
    await test.step('Нажимаем кнопку "Войти"', async () => {
      await mainPage.clickLoginButton();
    });

    await test.step(`Проверяем, что произошёл переход на ${BASE_URL}/login`, async () => {
      await expect(mainPage.page, `Ожидался переход на страницу авторизации ${BASE_URL}/login`).toHaveURL(/\/login/);
    });
  });
});

test.describe('Проверка email на ШОКовость', () => {
  test.beforeEach(async ({ mainPage }) => {
    await test.step(`Открыта главная страница: ${BASE_URL}`, async () => {
      await mainPage.open();
    });
  });

  test('Check existing email - valid email shows green message', async ({ mainPage }) => {
    await test.step(`Вводим email зарегистрированного пользователя: ${TEST_USER_EMAIL}`, async () => {
      await mainPage.checkEmailStatus(TEST_USER_EMAIL, true);
    });

    await test.step('Фраза отображается зелёным цветом', async () => {
      await mainPage.checkColorOfPhrase(COLORS.GREEN, true);
    });

    await test.step('Гифка с котиком отображается', async () => {
      await expect(mainPage.catGif, 'Гифка с котиком должна быть видимой для зарегистрированного email').toBeVisible();
    });
  });

  test('Check existing email - invalid email shows red message', async ({ mainPage }) => {
    await test.step(`Вводим незарегистрированный email: ${TEST_UNREGISTERED_EMAIL}`, async () => {
      await mainPage.checkEmailStatus(TEST_UNREGISTERED_EMAIL, false);
    });

    await test.step('Фраза отображается красным цветом', async () => {
      await mainPage.checkColorOfPhrase(COLORS.RED, false);
    });

    await test.step('Гифка с котиком НЕ отображается', async () => {
      await expect(mainPage.catGif, 'Гифка не должна отображаться при незарегистрированном email').not.toBeVisible();
    });
  });
});
