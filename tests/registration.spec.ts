import { test, expect } from '../fixtures/index';
import {
  generateRandomEmail,
  generateRandomPassword,
  generateRandomAge,
  generateRandomName
} from '../utils/dataGenerator';
import { defaultUser } from '../utils/client';

test.describe('Регистрация', () => {

      
  test('Успешная регистрация', async ({ registrationPage, profilePage }) => {
    await test.step('Заполнить валидные данные', async () => {
      await registrationPage.open();
      await registrationPage.register(
        generateRandomEmail(),
        generateRandomPassword(),
        generateRandomAge()
      );
      await expect(profilePage.logoutButton).toBeVisible();
    });  
  });

  test('Пользователь уже существует', async ({ registrationPage }) => {
    await test.step('Ввод уже зарегистрированный email', async () => {
      await registrationPage.open();
      await registrationPage.emailInput.fill(defaultUser.email);
      await registrationPage.passwordInput.fill(defaultUser.password);
      await registrationPage.ageInput.fill(generateRandomAge().toString());
      await registrationPage.submitButton.click();
      await expect(registrationPage.existUserMessage).toBeVisible();
    });  
  });

  test('Невалидный email', async ({ registrationPage }) => {
    await test.step('Ввод невалидный email', async () => {
      await registrationPage.open();
      await registrationPage.register('not-an-email', '123456', '20');
      await expect(registrationPage.wrongEmailMessage).toBeVisible();
    });  
  });

  test('Слишком короткий пароль', async ({ registrationPage }) => {
    await test.step('Ввод короткий пароль', async () => {
      await registrationPage.open();
      await registrationPage.register(generateRandomEmail(), '123', '25');
      await expect(registrationPage.tooShortPasswordMessage).toBeVisible();
    });  
  });

  test('Пустые поля', async ({ registrationPage }) => {
    await test.step('Оставить все поля пустыми', async () => {
      await registrationPage.open();
      await registrationPage.register('', '', '');
      await expect(registrationPage.emailRequiredMessage).toBeVisible();
      await expect(registrationPage.passwordRequiredMessage).toBeVisible();
      await expect(registrationPage.ageRequiredMessage).toBeVisible();
    });  
  });

  test('Email уже используется', async ({ registrationPage }) => {
    await test.step('Email уже используется', async () => {
      await registrationPage.open();
      await registrationPage.register(
        defaultUser.email,
        generateRandomPassword(),
        generateRandomAge()
      );
      await expect(registrationPage.existUserMessage).toBeVisible();
    });
  });  
});
