import { expect } from '@playwright/test';
import { test } from '../fixtures/index';


test('check valid email', async ({ mainPage }) => {
  await mainPage.open();
  await mainPage.checkEmail('anastasiagurtovykh@yandex.ru', true);
});

test('check invalid email - non-existing user', async ({ mainPage }) => {
  await mainPage.open();
  await mainPage.checkEmail('nonexistent@example.com', false);
});

test('check invalid email format', async ({ mainPage }) => {
  await mainPage.open();
  await mainPage.checkEmail('invalid-email-format', false);
});

// Локаторы
// test ('title test', async ({ mainPage }) => {
//   await mainPage.open();
//   await expect(mainPage.title).toBeVisible();
// })
// test ('input test', async ({ mainPage }) => {
//   await mainPage.open();
//   await expect(mainPage.input).toBeVisible();
// })
// test ('placeholder test', async ({ mainPage }) => {
//   await mainPage.open();
//   await expect(mainPage.toLoginPlaceholder).toBeVisible();
// })
// test ('check button test', async ({ mainPage }) => {
//   await mainPage.open();
//   await expect(mainPage.checkButton).toBeVisible();
// })
// test ('to login button test', async ({ mainPage }) => {
//   await mainPage.open();
//   await expect(mainPage.toLoginButton).toBeVisible();
// })
// test ('happy cat img test', async ({ mainPage }) => {
//   await mainPage.open();
//   await expect(mainPage.happyCatImg).toBeVisible();
// })
// test ('in shock text test', async ({ mainPage }) => {
//   await mainPage.open();
//   await expect(mainPage.InShockText).toBeVisible();
// })
// test ('not in shock text test', async ({ mainPage }) => {
//   await mainPage.open();
//   await expect(mainPage.notInShockText).toBeVisible();
// })