import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { getTestUserEmail } from "../utils/env";
import { generateRandomEmail } from "../utils/data-generator"

test.describe('Проверка ШОКовости для зарегистрированного пользователя', () => {
  test('cat_should_exist', async ({ mainPage }) => {
    await test.step('Открыть главную страницу', async () => {
      await mainPage.open();
    });
    await test.step('Проверить email зарегистрированного пользователя', async () => {
      await mainPage.checkEmail(getTestUserEmail());
    });
    await test.step('Проверить сообщение о шоковости', async () => {
      await expect(mainPage.page.getByText('Ты уже в ШОКе'),
        'Должно отображаться сообщение о том, что пользователь уже в шоке').toBeVisible();
    });
  });
});

test.describe('Проверка ШОКовости для незарегистрированного пользователя', () => {
  test('cat_should_not_exist', async ({ mainPage }) => {
    await test.step('Открыть главную страницу', async () => {
      await mainPage.open();
    });
    await test.step('Проверить email незарегистрированного пользователя', async () => {
      await mainPage.checkEmail(generateRandomEmail());
    });
    await test.step('Проверить сообщение о не-шоковости', async () => {
      await expect(mainPage.page.getByText('Ты еще не в ШОКе'),
        'Должно отображаться сообщение о том, что пользователь не в шоке').toBeVisible();
    });
  });
});

test.describe('Проверка элементов главной страницы', () => {
  test('main_page_should_contain', async ({ mainPage }) => {
    await test.step('Открыть главную страницу', async () => {
      await mainPage.open();
    });

    await test.step('Проверить элементы главной страницы', async () => {
      await expect.soft(mainPage.title, 'Заголовок главной страницы должен быть видимым').toBeVisible();
      await expect.soft(mainPage.input, 'Поле ввода email должно быть видно').toBeVisible();
      await expect.soft(mainPage.input, 'Плейсхолдер поля ввода email должен быть Введите email')
        .toHaveAttribute('placeholder', 'Введите email');
      await expect.soft(mainPage.checkButton, 'Кнопка проверки должна быть видимой').toBeVisible();
      await expect.soft(mainPage.checkButton, 'Текст кнопки проверки должен быть "Я в шоке?"')
        .toHaveText('Я в шоке?');
      await expect.soft(mainPage.toLoginButton, 'Кнопка входа должна быть видимой').toBeVisible();
      await expect.soft(mainPage.toLoginButton, 'Текст кнопки входа должен быть В шок')
        .toHaveText('В шок');
    });
  });
});