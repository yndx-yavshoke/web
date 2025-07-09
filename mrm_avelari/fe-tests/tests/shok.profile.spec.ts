import { test } from '../fixtures/index';
import { expect } from '@playwright/test';

test('Profile / avatar  visible', async ({ profilePage }) => {
  await profilePage.open();
  await expect(profilePage.avatar).toBeVisible();
});

test('Display name and status user', async ({ profilePage }) => {
  await profilePage.open();

  await expect(profilePage.name).toBeVisible();
  await expect(profilePage.status).toBeVisible();
});
