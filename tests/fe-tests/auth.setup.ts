import { test } from '@playwright/test';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { RegisterPage } from '../fe-tests/pages/register.page';
import { step } from 'allure-js-commons';

test('setup auth state', async () => {
  const authDir = path.resolve(__dirname, '../.auth');
  const storagePath = path.join(authDir, 'user.json');

  await step('Create .auth directory if it does not exist', async () => {
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }
  });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const testUser = {
    email: `testuser_${Date.now()}@yavshok.com`,
    password: 'TestPass123!',
    age: '34',
  };

  await step('Wait for initial page load', async () => {
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
  });

  await step('Navigate to registration page and register user', async () => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.register(testUser);
  });

  await step('Verify user is logged in by waiting for logout button', async () => {
    await page.getByTestId('user-logout-button').filter({ hasText: 'Logout' }).waitFor();
  });

  await step('Save storage state to .auth/user.json', async () => {
    await page.context().storageState({ path: storagePath });
  });

  await step('Close browser', async () => {
    await browser.close();
  });
});