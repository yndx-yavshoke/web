import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test.use({ storageState: 'tests/setup/auth/user1.json' });

test.beforeEach(async ({ profilePage }) => {
  await profilePage.open();
});

test('Отображение основных элементов', async ({ profilePage }) => {
  await expect(profilePage.name).toBeVisible();
  await expect(profilePage.avatar).toBeVisible();
  await expect(profilePage.status).toBeVisible();
  await expect(profilePage.posts).toBeVisible();
  await expect(profilePage.subscribers).toBeVisible();
  await expect(profilePage.likes).toBeVisible();
  await expect(profilePage.toEditButton).toBeVisible();
  await expect(profilePage.toLogoutButton).toBeVisible();
  await expect(profilePage.photo0).toBeVisible();
  await expect(profilePage.photo1).toBeVisible();
  await expect(profilePage.photo2).toBeVisible();
  await expect(profilePage.photo3).toBeVisible();
});

test('Кнопка "Редактировать профиль" ведёт на экран изменения имени', async ({
  profilePage,
  page,
}) => {
  await profilePage.toEditButton.click();

  await expect(page.getByTestId('edit-name-input')).toBeVisible();
  await expect(page.getByTestId('edit-save-button')).toBeVisible();
});

test('Кнопка "logout" ведёт на начальную страницу', async ({ profilePage, mainPage }) => {
  await profilePage.toLogoutButton.click();
  await expect(mainPage.title).toBeVisible();
});
