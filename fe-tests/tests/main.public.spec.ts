import { expect } from '@playwright/test';
import { test } from './fixtures/noAuth';

test('Заголовок "Я в ШОКе" отображается на главной', async ({ mainPage }) => {
  await mainPage.open();
  await expect(mainPage.title).toBeVisible();
});

test('Проверка ШОКовости зарегистрированного email', async ({ mainPage }) => {
  await mainPage.open();
  await mainPage.checkEmail('qwe1qwe@mail.ru');
  await expect(mainPage.inShokText).toBeVisible();
});

test('Проверка ШОКовости незарегистрированного email', async ({ mainPage }) => {
  await mainPage.open();
  await mainPage.checkEmail('nop1nop@mail.ru');
  await expect(mainPage.notInShokText).toBeVisible();
});

test('Проверка ШОКовости с пустым email', async ({ mainPage }) => {
  await mainPage.open();
  await mainPage.checkEmail('');
  await expect(mainPage.notInShokText).not.toBeVisible();
  await expect(mainPage.happyCatImage).not.toBeVisible();
});