import { expect } from '@playwright/test';
import { test } from '../fixtures/noAuthFixtures';

const getRandomCredentials = () => {
  const randomId = Math.floor(Math.random() * 10000);
  return {
    email: `test${randomId}@yandex.ru`,
    password: `Qw${randomId}erty!`,
    age: Math.floor(Math.random() * 50) + 18
  };
};

test('Открытие страницы регистрации', async ({ registration }) => {
  await registration.navigateTo();
  await expect(registration.formHeader).toBeVisible();
});

test('Регистрация с пустыми полями', async ({ registration }) => {
  await registration.navigateTo();
  await registration.completeRegistration('', '', '');
  await expect(registration.emailErrorMsg).toBeVisible();
  await expect(registration.passwordErrorMsg).toBeVisible();
  await expect(registration.ageErrorMsg).toBeVisible();
});

test('Успешная регистрация', async ({ registration }) => {
  const user = getRandomCredentials();
  await registration.navigateTo();
  await registration.completeRegistration(user.email, user.password, user.age.toString());
  await expect(registration.browserTab).toHaveURL('/');
});