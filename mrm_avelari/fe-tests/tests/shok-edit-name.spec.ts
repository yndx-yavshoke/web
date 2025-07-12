import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { faker } from '@faker-js/faker';
import { BASE_URL } from '../constants/env';

test.use({ storageState: 'tests/setup/.auth/user.json' })

test.describe('Проверка UI элементов страницы редактирования профиля', () => {
  test.beforeEach(async ({ editProfilePage }) => {
    await test.step(`Открыта страница редактирования профиля: ${BASE_URL}/edit`, async () => {
      await editProfilePage.open();
    });
  });

  test('All main elements are visible and correct', async ({ editProfilePage }) => {
    await test.step('Проверяем наличие всех ключевых UI-элементов на странице', async () => {
      await editProfilePage.expectUI();
    });
  });

  test('Successful name change', async ({ editProfilePage }) => {
    const newName = faker.person.fullName();

    await test.step(`Вводим новое имя пользователя: "${newName}"`, async () => {
      await editProfilePage.updateName(newName);
    });

    await test.step('Нажимаем кнопку "Отмена"', async () => {
      await editProfilePage.clickCancelButton();
    });

    await test.step(`Проверяем, что имя "${newName}" отображается на странице профиля`, async () => {
      await expect(editProfilePage.page.getByText(newName)).toBeVisible();
    });
  });

  test('Cancel button redirects back to profile page', async ({ editProfilePage }) => {
    await test.step('Нажимаем кнопку "Отмена"', async () => {
      await editProfilePage.clickCancelButton();
    });

    await test.step(`Проверяем, что URL соответствует странице профиля: ${BASE_URL}`, async () => {
      await expect(editProfilePage.page).toHaveURL('/');
    });
  });
});
