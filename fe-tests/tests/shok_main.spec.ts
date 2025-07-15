import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { newUser, oldUser } from '../users/users';

test('Проверка наличия заголовка', async ({ mainPage }) => {
  await test.step('Открыть главную страницу', async () => {
    await mainPage.open();
  });

  await test.step('Проверить видимость заголовка', async () => {
    await expect(mainPage.title).toBeVisible();
  });
});

test('Проверка, что пользователь "В ШОКе"', async ({ mainPage, page }) => {
  await test.step('Открыть главную страницу', async () => {
    await mainPage.open();
  });

  await test.step(`Проверить email пользователя: ${oldUser.email}`, async () => {
    await mainPage.checkEmail(oldUser.email);
  });

  await test.step('Проверить статус "В ШОКе"', async () => {
    await expect(page.getByText('Ты уже в ШОКе', { exact: true })).toBeVisible();
  });
});

test('Проверка, что пользователь не "В ШОКе"', async ({ mainPage, page }) => {
  await test.step('Открыть главную страницу', async () => {
    await mainPage.open();
  });

  await test.step(`Проверить email пользователя: ${newUser.email}`, async () => {
    await mainPage.checkEmail(newUser.email);
  });

  await test.step('Проверить статус "Не в ШОКе"', async () => {
    await expect(page.getByText('Ты еще не в ШОКе', { exact: true })).toBeVisible();
  });
});

test('Проверка плейсхолдера в поле email', async ({ mainPage, page }) => {
  await test.step('Открыть главную страницу', async () => {
    await mainPage.open();
  });

  await test.step('Проверить плейсхолдер поля email', async () => {
    const emailInput = page.getByTestId('main-email-input');
    await expect(emailInput).toHaveAttribute('placeholder', 'Введите email');
  });
});