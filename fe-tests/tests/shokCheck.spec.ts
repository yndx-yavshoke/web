import { test } from '../fixtures/index';
import { expect } from '@playwright/test';

test('Проверка положительной валидации зарегистрированного email', async ({
  mainPage,
  registrationPage,
  page
}) => {
  await registrationPage.open();
  const testEmail = `test${Date.now()}@gmail.com`;
  await registrationPage.fillForm(testEmail, 'asd555', '20');
  await registrationPage.submitForm();
  await mainPage.open();
  await mainPage.checkEmail(testEmail, true);
  await expect(mainPage.trueLogin).toBeVisible();
  await expect(mainPage.trueLoginCat).toBeVisible();
});
test('Проверка отрицательной валидации незарегистрированного email', async ({ mainPage }) => {
  await mainPage.open();
  await mainPage.checkEmail('notregistered@example.com', false);
  await expect(mainPage.falseLogin).toBeVisible();
  await expect(mainPage.trueLoginCat).not.toBeVisible();
});
test('Переход к авторизации по кнопке "В ШОК"', async ({ mainPage, page }) => {
  await mainPage.open();
  await mainPage.toLoginButtonClick();
  await expect(page).toHaveURL('/login');
});