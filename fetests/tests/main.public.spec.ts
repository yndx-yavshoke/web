import { expect } from '@playwright/test';
import { test } from '../fixtures/noAuth';

test('Заголовок "Я в ШОКе" отображается на главной', async ({ mainPage }) => {
  await mainPage.open();
  await expect(mainPage.title).toBeVisible();
});

test('Проверка шоковости зарегистрированного email', async ({ mainPage }) => {
  await mainPage.open();
  await mainPage.checkEmail('test547892@yandex.ru');
  await expect(mainPage.inShokText).toBeVisible();
});

test('Проверка шоковости незарегистрированного email', async ({ mainPage }) => {
  await mainPage.open();
  await mainPage.checkEmail('test547892777888@yandex.ru');
  await expect(mainPage.notInShokText).toBeVisible();
});

test('Проверка шоковости с пустым email', async ({ mainPage }) => {
  await mainPage.open();
  await mainPage.checkEmail('');
  await expect(mainPage.notInShokText).not.toBeVisible();
  await expect(mainPage.happyCatImage).not.toBeVisible();
});