import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { TEST_USER_EMAIL, TEST_UNREGISTERED_EMAIL } from '../fixtures/env';

test.describe('MAIN PAGE', () => {
  test('Page opened', async ({ mainPage }) => {
    await mainPage.open();

    await expect(mainPage.title).toBeVisible();
  });

  test('Check existing email - valid email shows green message', async ({
    mainPage,
  }) => {
    await mainPage.open();

    await mainPage.checkEmail(TEST_USER_EMAIL, true);
    await mainPage.checkColorOfPhrase('rgb(0, 128, 0)', true);
    await expect(mainPage.catGif).toBeVisible();
  });

  test('Check existing email - invalid email shows red message', async ({
    mainPage,
  }) => {
    await mainPage.open();

    await mainPage.checkEmail(TEST_UNREGISTERED_EMAIL, false);
    await mainPage.checkColorOfPhrase('rgb(255, 0, 0)', false);
    await expect(mainPage.catGif).not.toBeVisible();
  });
});
