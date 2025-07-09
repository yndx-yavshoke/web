import { expect } from '@playwright/test';
import { test } from '../../fixtures/noAuth';
import { ShokLoginPage } from '../../fixtures/ShokLoginPage';

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
  await loginPage.login('cat1@ya.ru', '123456');
  await expect(page).toHaveURL('/');
});

test('Авторизация незарегистрированного пользователя', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login('notcat1@ya.ru', '654321');
});
