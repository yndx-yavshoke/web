import { test, expect } from '../fixtures/index';
import { defaultUser } from '../utils/client';

test('login and save storage', async ({  page, loginPage, profilePage }) => {
  
  await loginPage.open();

  await loginPage.emailInput.fill(defaultUser.email);
  await loginPage.passwordInput.fill(defaultUser.password);
  await loginPage.submitButton.click();

  await expect(profilePage.logoutButton).toBeVisible();

  await page.context().storageState({ path: 'tests/auth/storageState.json' });
});
