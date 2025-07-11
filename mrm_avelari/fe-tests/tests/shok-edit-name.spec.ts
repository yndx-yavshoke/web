import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { faker } from '@faker-js/faker';
import { expectEditProfilePageUI } from '../utils/testHelpers';

test.describe('Проверка UI элементов страницы редактирования профиля', () => {
  test.beforeEach(async ({ editProfilePage }) => {
    await editProfilePage.open();
  });

  test('All main elements are visible and correct', async ({ editProfilePage }) => {
    await expectEditProfilePageUI(editProfilePage);
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
