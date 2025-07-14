import { expect } from '@playwright/test';
import { test } from '../fixtures/noAuthFixtures';
import { ShockAuth } from '../fixtures/loginPageFixture';

const TEST_CREDENTIALS = {
  valid: {
    email: 'abra@mail.ru',
    password: 'cadabra'
  },
  invalid: {
    email: 'invalid222@mail.ru',
    password: 'qwerty123'
  }
};

test('Отображение страницы входа в систему', async ({ auth }) => {
  await auth.navigateTo();
  await expect(auth.authTitle).toBeVisible({ timeout: 10000 });
});

test('Проверка валидации пустой формы', async ({ auth }) => {
  await auth.navigateTo();
  await auth.signIn('', '');
  
  await expect(auth.loginAlert).toBeVisible();
  await expect(auth.passwordAlert).toBeVisible();
});

test('Успешная аутентификация', async ({ auth, page }) => {
  await auth.navigateTo();
  await auth.signIn(
    TEST_CREDENTIALS.valid.email,
    TEST_CREDENTIALS.valid.password)
  await expect(page).toHaveURL('/', { timeout: 15000 });
});