import { expect } from '@playwright/test';
import { test } from '../../fixtures/index';

const userFile = './tests/setup/.auth/user.json';

test('login once and save storage', async ({ authPage, testEmail, testPassword, page }) => {
  await authPage.open();
  await authPage.login(testEmail, testPassword);

  await expect(page.getByTestId('user-logout-button')).toBeVisible();

  await page.context().storageState({ path: userFile });
});
