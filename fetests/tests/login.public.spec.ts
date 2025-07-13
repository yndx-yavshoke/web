import { expect } from '@playwright/test';
import { test } from '../fixtures/noAuth';
import { ShokLoginPage } from '../fixtures/ShokLoginPage';

test('Переход на страницу авторизации', async ({ loginPage }) => {
  await loginPage.open();
  await expect(loginPage.title).toBeVisible();
});

test('Авторизация с пустыми обязательными полями', async ({ loginPage, page }) => {
  await loginPage.open();
  await loginPage.login('', '');
  await expect(page).not.toHaveURL('/');
  await expect(loginPage.emailMessageError).toBeVisible();
  await expect(loginPage.passwordMessageError).toBeVisible();
});

test('Авторизация зарегистрированного пользователя', async ({ loginPage, page }) => {
  await loginPage.open();
  await loginPage.login('test547892@yandex.ru', 'qwerty123');
  await expect(page).toHaveURL('/');
});

test('Авторизация незарегистрированного пользователя', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login('test547892777888@yandex.ru', 'qwerty123');
});