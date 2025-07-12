import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
test('Успешная регистрация с валидными данными', async ({ registrationPage, page }) => {
  await registrationPage.open();
  await registrationPage.fillForm('asdf@gdaasdfsaвdfmail.com', 'asd555', '20');
  await registrationPage.submitForm();
  await expect(page).toHaveURL('/');
  await expect(registrationPage.title).not.toBeVisible();
});
test('Ошибка при пустом пароле', async ({ registrationPage }) => {
  await registrationPage.open();
  await registrationPage.registerEmailInput.fill('asdf@gmail.com');
  await registrationPage.registerAgeInput.fill('20');
  await registrationPage.submitForm();
  await expect(registrationPage.noPassword).toBeVisible();
  await expect(registrationPage.registerButton).toBeVisible();
});
test('Ошибка при невалидном email', async ({ registrationPage }) => {
  await registrationPage.open();
  await registrationPage.fillForm('asdfgdf', 'asd555', '20');
  await registrationPage.submitForm();
  await expect(registrationPage.invalidEmail).toBeVisible();
  await expect(registrationPage.registerButton).toBeVisible();
});