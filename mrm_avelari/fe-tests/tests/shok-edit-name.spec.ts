import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { faker } from '@faker-js/faker';

test.describe('Проверка UI элементов страницы редактирования профиля', () => {
  test.beforeEach(async ({ editProfilePage }) => {
    await editProfilePage.open();
  });

  test('All main elements are visible and correct', async ({ editProfilePage }) => {
    await expect(editProfilePage.title).toBeVisible();

    await expect(editProfilePage.labelName).toBeVisible();
    await expect(editProfilePage.inputPlaceholder).toBeVisible();
    await expect(editProfilePage.input).toBeVisible();

    await expect(editProfilePage.saveButtonLabel).toBeVisible();
    await expect(editProfilePage.toSaveButton).toBeVisible();

    await expect(editProfilePage.cancelButtonLabel).toBeVisible();
    await expect(editProfilePage.toCancelButton).toBeVisible();
  });

  test('Successful name change', async ({ editProfilePage }) => {
    const newName = faker.person.fullName();

    await editProfilePage.changeName(newName);
    await editProfilePage.toCancelButtonClick();

    await expect(editProfilePage.page.getByText(newName)).toBeVisible();
  });

  test('Cancel button redirects back to profile page', async ({ editProfilePage, page }) => {
    await editProfilePage.toCancelButtonClick();
    await expect(page).toHaveURL('/');
  });
});
