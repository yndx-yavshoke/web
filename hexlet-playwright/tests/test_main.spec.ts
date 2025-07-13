import { expect } from '@playwright/test';
import {test} from '../fixtures/index';
import { LOGIN_EMAIL, generateEmail} from '../helpers/helpers';

test('Проверка вывода сообщения, что пользователь уже зарегистрирован', async ({ mainPage }) => {

  await mainPage.open();
  await expect(mainPage.title).toBeVisible();
  await test.step('Ввод почты зарегистрированного пользователя и проверка на шоковость', async () => {
    await mainPage.checkEmail(LOGIN_EMAIL, true);

});

  await expect(mainPage.textExist).toBeVisible();


})

test('Проверка вывода сообщения, что пользователь не зарегистрирован', async ({ mainPage }) => {

  await mainPage.open();
  await expect(mainPage.title).toBeVisible();
  await test.step('Ввод почты незарегистрированного пользователя и проверка на шоковость', async () => {
    await mainPage.checkEmail(generateEmail(), true);
  });


  await expect(mainPage.textNotExist).toBeVisible();

  
})

test('Проверка некликабельности кнопки при пустом поле ввода email', async ({ mainPage }) => {

  await mainPage.open();
  await expect(mainPage.title).toBeVisible();
  await test.step("Оставить поле ввода email пустым и нажать на кнопку 'Я в шоке?'", async () => {
    await mainPage.checkEmail('', true);
  });

  await expect(mainPage.checkButton).toHaveAttribute('aria-disabled', 'true');


  
})

test('Навигация на страницу регистрации', async ({ mainPage }) => {


  await mainPage.open();
  
  await expect(mainPage.title).toBeVisible();
  await test.step('Нажатие на кнопку в ШОК для перехода на страницу регистрации', async () => {

    await mainPage.clickLogin();
  });

  await expect(mainPage.textAuth).toBeVisible();

  
})
