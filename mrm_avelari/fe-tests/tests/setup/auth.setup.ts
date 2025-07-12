import { expect } from '@playwright/test';
import { test } from '../../fixtures/index';
import { BASE_URL } from '../../constants/env';

const userFile = './tests/setup/.auth/user.json';

test('login once and save storage', async ({ authPage, testEmail, testPassword, page }) => {
  await test.step(`Отображается страница авторизации ${BASE_URL}/login`, async () => {
    await authPage.open();
  });

  await test.step('Ввести корректные данные и нажать "Войти"', async () => {
    await authPage.login(testEmail, testPassword);
  });

  await test.step('Проверить, что пользователь залогинен (наличие кнопки выхода)', async () => {
    await expect(page.getByTestId('user-logout-button'), 'Кнопка выхода должна быть видимой после успешного входа').toBeVisible();
  });

  await test.step('Сохранение данных в storage', async () => {
    await page.context().storageState({ path: userFile });
  });
});
