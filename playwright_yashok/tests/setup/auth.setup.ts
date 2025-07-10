import { test as setup } from '../../fixtures/index';
import { expect } from '@playwright/test';

setup('authenticate1', async ({ loginPage, page }) => {
  await loginPage.open();

  await loginPage.emailinput.fill('yassbar@mail.ru');
  await loginPage.passwordinput.fill('1234567');
  await loginPage.toLoginButton.click();

  await page.waitForURL('https://yavshok.ru/');

  await expect(page.getByTestId('user-avatar')).toBeVisible();

  await page.context().storageState({ path: 'tests/setup/auth/user1.json' });
});

setup('authenticate3', async ({ loginPage, page }) => {
  await loginPage.open();

  await loginPage.emailinput.fill('yasssbar@mail.ru');
  await loginPage.passwordinput.fill('1234567');
  await loginPage.toLoginButton.click();

  await page.waitForURL('https://yavshok.ru/');

  await expect(page.getByTestId('user-avatar')).toBeVisible();

  await page.context().storageState({ path: 'tests/setup/auth/user3.json' });
});
