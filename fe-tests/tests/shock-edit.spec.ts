import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';

test.use({ storageState: 'tests/setup/auth.json' });

test.describe('Страница редактирования профиля', () => {
  test('Редактирование имени пользователя', async ({ editPage, profilePage, page }) => {
    await allure.step('Открыть страницу редактирования профиля', async () => {
      await editPage.open();
    });
    await allure.step('Проверить отображение заголовка страницы', async () => {
      await expect(page.getByText('Edit Profile')).toBeVisible();
    });
    const randomName = faker.person.firstName();
    await allure.step(`Ввести новое имя: ${randomName}`, async () => {
      await editPage.nameInput.fill(randomName);
    });
    await allure.step('Сохранить изменения', async () => {
      await editPage.clickSaveButton();
    });
    await allure.step('Вернуться на страницу профиля', async () => {
      await editPage.clickCancelButton();
    });
    await allure.step('Перейти на страницу профиля', async () => {
      await profilePage.open();
    });
    await allure.step('Проверить, что имя пользователя изменилось', async () => {
      await expect(profilePage.userName).toHaveText(randomName);
    });
    await allure.step('Восстановить стандартное имя для других тестов', async () => {
      await editPage.open();
      await editPage.nameInput.fill("Neko");
      await editPage.clickSaveButton();
      await editPage.clickCancelButton();
    });
  });

  test('Вводимость текста в поле ввода имени', async ({ editPage }) => {
    await editPage.open();
    await expect(editPage.nameInput).toBeVisible();
    const randomName = faker.person.firstName();
    await editPage.nameInput.fill(randomName);
    await expect(editPage.nameInput).toHaveValue(randomName);
  });

  test('Кнопка отмена не сохраняет изменения', async ({ editPage, profilePage }) => {
    await allure.step('Открыть страницу редактирования профиля', async () => {
      await editPage.open();
    });
    await allure.step('Проверить видимость кнопки отмена', async () => {
      await expect(editPage.cancelButton).toBeVisible();
    });
    const randomName = faker.person.firstName();
    await allure.step(`Ввести новое имя: ${randomName}`, async () => {
      await editPage.nameInput.fill(randomName);
    });
    await allure.step('Кликнуть на кнопку отмена', async () => {
      await editPage.clickCancelButton();
    });
    await allure.step('Проверить, что имя пользователя не изменилось', async () => {
      await expect(profilePage.userName).toHaveText("Neko");
    });
  });

});