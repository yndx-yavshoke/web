import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { TEST_USER_EMAIL, TEST_UNREGISTERED_EMAIL } from '../constants/env';
import { COLORS } from '../constants/colors';

test.describe('Проверка UI элементов главной страницы и навигации', () => {
  test.beforeEach(async ({ mainPage }) => {
    await mainPage.open();
  });

  test('All main elements are visible and correct', async ({ mainPage }) => {
    await mainPage.expectUI();
  });

  test('Navigate to login page on clicking "Login" button', async ({ mainPage }) => {
    await mainPage.open();
    await mainPage.clickLoginButton();

    await expect(mainPage.page).toHaveURL(/login/);
  });
});

test.describe('Проверка ШОКовости', () => {
  test.beforeEach(async ({ mainPage }) => {
    await mainPage.open();
  });

  test('Check existing email - valid email shows green message', async ({ mainPage }) => {
    await mainPage.checkEmailStatus(TEST_USER_EMAIL, true);
    await mainPage.checkColorOfPhrase(COLORS.GREEN, true);
    await expect(mainPage.catGif).toBeVisible();
  });

  test('Check existing email - invalid email shows red message', async ({ mainPage }) => {
    await mainPage.checkEmailStatus(TEST_UNREGISTERED_EMAIL, false);
    await mainPage.checkColorOfPhrase(COLORS.RED, false);
    await expect(mainPage.catGif).not.toBeVisible();
  });
});
