import { expect } from '@playwright/test';
import { test } from './fixtures/noAuth';
import { loginPage } from './fixtures/loginPage';

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
  await loginPage.login('qwe1qwe@mail.ru', '111111');
  await expect(page).toHaveURL('/');
});

test('Авторизация незарегистрированного пользователя', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login('nop1nop@mail.ru', '121212');
});