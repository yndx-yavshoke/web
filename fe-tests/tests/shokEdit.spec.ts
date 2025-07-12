import { expect } from '@playwright/test';
import { test } from '../fixtures/index';


test('Отображается заголовок Edit Profile', async ({ editPage }) => {
  await editPage.open();
  await expect(editPage.title).toBeVisible();
  await expect(editPage.title).toHaveText('Edit Profile');
});

test('Есть кнопка Saved Changes', async ({ editPage }) => {
    await editPage.open();
    await expect(editPage.editSaveButton).toBeVisible();
    });
test('Есть кнопка Cancel', async ({ editPage }) => {
    await editPage.open();
    await expect(editPage.editCancelButton).toBeVisible();
    });