import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test('Отображение элементов на главной странице', async ({ mainPage }) => {
  await mainPage.open();
  await expect(mainPage.title).toBeVisible();

  await expect(mainPage.input).toBeVisible();

  await expect(mainPage.checkButton).toBeVisible();
  await expect(mainPage.toLoginButton).toBeVisible();
});

test('Проверка зарегистрированного email', async ({ mainPage }) => {
  await mainPage.open();

  await mainPage.checkEmail('yassbar@mail.ru');

  await expect(mainPage.resultMessage).toBeVisible();
});

test('Проверка незарегистрированного email', async ({ mainPage }) => {
  await mainPage.open();

  await mainPage.checkEmail('yassbar@mail.rud');

  await expect(mainPage.resultMessage).toBeVisible();
});
