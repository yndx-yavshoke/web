import { test } from '../../fixtures/index';
import { expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('login-email-input').fill('asda@gmail.com');
  await page.getByTestId('login-password-input').fill('asdasd');
  await page.getByTestId('login-submit-button').click();
  await expect(page.getByTestId('user-edit-profile-button')).toBeVisible();
  await page.context().storageState({ path: './tests/setup/auth.json' });
});