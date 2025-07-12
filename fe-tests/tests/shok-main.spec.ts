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
