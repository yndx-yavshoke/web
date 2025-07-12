import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test.use({ storageState: 'tests/setup/auth.json' })

test('Кнопка Logout', async ({ profilePage }) => {
  await profilePage.open();
  await expect(profilePage.userLogoutButton).toBeVisible();
  await profilePage.userLogoutButtonClick();
  await expect(profilePage.page).toHaveURL('/');
});
test('Кнопка Edit Profile', async ({ profilePage }) => {
  await profilePage.open();
  await profilePage.userEditProfileButtonClick();
  await expect(profilePage.page).toHaveURL(/\/edit/);
});
test('Имя пользователя', async ({ profilePage }) => {
  await profilePage.open();
  await expect(profilePage.name).toHaveText('Neko');
});