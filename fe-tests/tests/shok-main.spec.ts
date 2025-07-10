import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';


test('email зарегистрирован', async ({ mainPage }) => {
  await allure.step('Открыть главную страницу', async () => {
  await mainPage.open();
  });
  await allure.step('Проверить зарегистрированный email', async () => {
  await mainPage.checkEmail('anastasiagurtovykh@yandex.ru', true);
  });
});

test('email не зарегистрирован', async ({ mainPage }) => {
  const randomEmail = faker.internet.email();
  await allure.step('Открыть главную страницу', async () => {
  await mainPage.open();
  });
  await allure.step(`Проверить незарегистрированный email: ${randomEmail}`, async () => {
    await mainPage.checkEmail(randomEmail, false);
  });
});

test('email без @', async ({ mainPage }) => {
  const invalidEmail = faker.lorem.word();
  await allure.step('Открыть главную страницу', async () => {
  await mainPage.open();
  });
  await allure.step(`Проверить некорректный email без @: ${invalidEmail}`, async () => {
    await mainPage.checkEmail(invalidEmail, false);
  });
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