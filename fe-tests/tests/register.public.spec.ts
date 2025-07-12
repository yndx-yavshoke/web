import { expect } from '@playwright/test';
import { test } from './fixtures/noAuth';

test('Переход на страницу регистрации', async ({ registerPage }) => {
  await registerPage.open();
  await expect(registerPage.title).toBeVisible();
});

test('Регистрация c пустыми полями', async ({ registerPage }) => {
  await registerPage.open();
  await registerPage.register('', '', '');
  await expect(registerPage.emailValidationError).toHaveText('Введите email');
  await expect(registerPage.passwordValidationError).toHaveText('Введите пароль');
  await expect(registerPage.ageValidationError).toHaveText('Введите возраст');
});

test('Плейсхолдеры в форме регистрации', async ({ registerPage }) => {
  await registerPage.open();
  await expect(registerPage.inputEmail).toHaveAttribute('placeholder', 'Email');
  await expect(registerPage.inputPassword).toHaveAttribute('placeholder', 'Пароль');
  await expect(registerPage.inputAge).toHaveAttribute('placeholder', 'Возраст');
});

test('Переход на экран авторизации кнопкой "Назад"', async ({ registerPage }) => {
  await registerPage.open();
  await registerPage.back();
  await expect(registerPage.page).toHaveURL('https://yavshok.ru/login');
});