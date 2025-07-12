import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { faker } from '@faker-js/faker';

test.use({ storageState: 'tests/setup/.auth/user.json' })

test.describe('Проверка UI элементов страницы редактирования профиля', () => {
  test.beforeEach(async ({ editProfilePage }) => {
    await editProfilePage.open();
  });

  test('All main elements are visible and correct', async ({ editProfilePage }) => {
    await editProfilePage.expectUI();
  });

  test('Successful name change', async ({ editProfilePage }) => {
    const newName = faker.person.fullName();

    await editProfilePage.updateName(newName);
    await editProfilePage.clickCancelButton();

    await expect(editProfilePage.page.getByText(newName)).toBeVisible();
  });

  test('Cancel button redirects back to profile page', async ({ editProfilePage }) => {
    await editProfilePage.clickCancelButton();
    await expect(editProfilePage.page).toHaveURL('/');
  });
});
