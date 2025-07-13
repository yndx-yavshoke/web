import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test.use({ storageState: 'tests/setup/auth/user.json' });

test('Проверка кнопки "Edit profile"', async ({ profilePage }) => {
  await test.step('Открыть страницу профиля', async () => {
    await profilePage.open();
  });

  await test.step('Нажать кнопку "Edit profile"', async () => {
    await profilePage.goEdit();
  });

  await test.step('Проверить переход на страницу редактирования', async () => {
    await expect(profilePage.page).toHaveURL(/\/edit\?__EXPO_ROUTER_key=/);
  });
});

test('Проверка кнопки "LogOut"', async ({ profilePage }) => {
  await test.step('Открыть страницу профиля', async () => {
    await profilePage.open();
  });

  await test.step('Нажать кнопку "LogOut"', async () => {
    await profilePage.goLogOut();
  });

  await test.step('Проверить переход на главную страницу', async () => {
    await expect(profilePage.page).toHaveURL('/');
  });
});