import { expect } from '@playwright/test';
import {test} from '../fixtures/index';
import { LOGIN_EMAIL, LOGIN_PASSWORD, generateEmail, generatePassword} from '../helpers/helpers';

test('Проверка обязательности поля пароль', async ({ loginPage }) => {

    await loginPage.open();
    await expect(loginPage.title).toBeVisible();
    await test.step('Ввод адреса почты без пароля и попытка залогиниться', async () => {
      await loginPage.login(LOGIN_EMAIL, '', true);
  
  });
  
  await expect(loginPage.textInputPassword).toBeVisible();
  
  
  })

  test('Проверка обязательности поля email', async ({ loginPage }) => {

    await loginPage.open();
    await expect(loginPage.title).toBeVisible();
    await test.step('Ввод пароля без почты и попытка залогиниться', async () => {
      await loginPage.login('', LOGIN_PASSWORD, true);
  
  });
  
  await expect(loginPage.textInputEmail).toBeVisible();
  
  
  })

  test('Проверка ввода неверного пароля', async ({ loginPage }) => {
    const password = generatePassword()

    await loginPage.open();
    await expect(loginPage.title).toBeVisible();
  
    await test.step('Ввод неверного пароля для зарегистрированного пользователя и попытка залогиниться', async () => {
      await loginPage.login(LOGIN_EMAIL, password, true);
  
  });
  
  await expect(loginPage.textWrongCredits).toBeVisible();

})

  test('Проверка ввода незарегистрированного пользователя', async ({ loginPage }) => {
    const email = generateEmail()
    const password = generatePassword()

    await loginPage.open();
    await expect(loginPage.title).toBeVisible();
  
    await test.step('Ввод кредитсов незарегистрированного пользователя и попытка залогиниться', async () => {
      await loginPage.login(email, password, true);
  
  });
  
  await expect(loginPage.textWrongCredits).toBeVisible();

})

  test('Навигация на страницу регистрации', async ({ loginPage }) => {


    await loginPage.open();
    
    await expect(loginPage.title).toBeVisible();
    await test.step('Нажатие на кнопку Регистрация для перехода на страницу регистрации', async () => {
  
      await loginPage.clickRegistration();
    });
  
    await expect(loginPage.textRegister).toBeVisible();
  
  
  
  })

  test('Навигация на главную страницу (страницу проверки шоковости)', async ({ loginPage }) => {


    await loginPage.open();
    
    await expect(loginPage.title).toBeVisible();
    await test.step('Нажатие на кнопку Назад для перехода на главную страницу', async () => {
  
      await loginPage.clickBackToMain();
    });
  
    await expect(loginPage.textMain).toBeVisible();
  
  
  
  })