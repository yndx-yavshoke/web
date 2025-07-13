import { test, expect } from '@playwright/test';
import { ExistPage } from '../pages/exist.page';
import { step } from 'allure-js-commons';

test('email is in database', async ({ page }) => {
  const existPage = new ExistPage(page);
  const validEmail = 'q@q.q';

  await test.step('Open the main page (exist page)', async () => {
    await page.goto('/');
  });

  await test.step(`Submit a valid email "${validEmail}"`, async () => {
    await existPage.submitEmail(validEmail);
  });

  await test.step('Verify that the success status is displayed', async () => {
    await existPage.verifySuccessState();
  });
});

test('email is not in database', async ({ page }) => {
  const existPage = new ExistPage(page);
  const invalidEmail = 'fail@yavshok.ru';

  await test.step('Open the main page (exist page)', async () => {
    await page.goto('/');
  });

  await test.step(`Submit an invalid email "${invalidEmail}"`, async () => {
    await existPage.submitEmail(invalidEmail);
  });

  await test.step('Verify that the error state is displayed', async () => {
    await existPage.verifyErrorState();
  });
});

test('user navigates from exist page to login page', async ({ page }) => {
  const existPage = new ExistPage(page);

  await test.step('Open the main (exist) page', async () => {
    await page.goto('/');
  });

  await test.step('Click the "Enter Shock" button and navigate to the login page', async () => {
    await existPage.goToLogin();
  });

  await test.step('Verify that the URL has changed to /login', async () => {
    await expect(page).toHaveURL(/\/login/);
  });

  await test.step('Check that the email input field is visible', async () => {
    await expect(page.getByTestId('login-email-input')).toBeVisible();
  });
});