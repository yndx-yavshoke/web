import { expect } from '@playwright/test';
import {test} from '../fixtures/index';
import { LOGIN_EMAIL, LOGIN_PASSWORD, generateEmail, generatePassword, generateAge, LOGIN_AGE, LOGIN_AGE_STRING } from '../helpers/helpers';

test('Проверка обязательности поля email', async ({ registrationPage }) => {

    await registrationPage.open();
    await expect(registrationPage.title).toBeVisible();
    await test.step('Ввод пароля и возраста без почты и попытка зарегистрироваться', async () => {
      await registrationPage.registration('', generatePassword(), generateAge(), true);
  
  });
  await expect(registrationPage.emailNull).toBeVisible();
  
  })

test('Проверка обязательности поля пароль', async ({ registrationPage }) => {

    await registrationPage.open();
    await expect(registrationPage.title).toBeVisible();
    await test.step('Ввод email и возраста без пароля и попытка зарегистрироваться', async () => {
      await registrationPage.registration(generateEmail(), '', generateAge(), true);
  
  });
  await expect(registrationPage.passwordNull).toBeVisible();
  
  })

test('Проверка обязательности поля возраст', async ({ registrationPage }) => {

    await registrationPage.open();
    await expect(registrationPage.title).toBeVisible();
    await test.step('Ввод email и пароля без возраста и попытка зарегистрироваться', async () => {
      await registrationPage.registration(generateEmail(), generatePassword(), '', true);
  
  });
  await expect(registrationPage.ageNull).toBeVisible();
  
  })  

  test('Проверка ввода кредитсов уже зарегистрированного пользователя', async ({ registrationPage }) => {

    await registrationPage.open();
    await expect(registrationPage.title).toBeVisible();
    await test.step('Ввод email, пароля и возраста уже зарегистрированного пользователя и попытка зарегистрироваться', async () => {
      await registrationPage.registration(LOGIN_EMAIL, LOGIN_PASSWORD, LOGIN_AGE, true);
  
  });
  await expect(registrationPage.alreadyRegister).toBeVisible();
  
  })

  test('Проверка вывода ошибки при попытке написать возраст числом и попытка зарегистрироваться', async ({ registrationPage }) => {

    await registrationPage.open();
    await expect(registrationPage.title).toBeVisible();
    await test.step('Ввод возраста буквами и попытка зарегистрироваться', async () => {
      await registrationPage.registration(generateEmail(), generatePassword(), LOGIN_AGE_STRING, true);
  
  });
  await expect(registrationPage.textCountWord).toBeVisible();
  
  })

  test('Проверка навигации на страницу авторизации при нажатии на кнопку Назад', async ({ registrationPage }) => {

    await registrationPage.open();
    await expect(registrationPage.title).toBeVisible();
    await test.step('Нажатие на кнопку Назад для перехода на страницу авторизации', async () => {
      await registrationPage.clickBack()
  
  });
  await expect(registrationPage.login).toBeVisible();
  
  })