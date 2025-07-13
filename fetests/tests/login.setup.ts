import { test as setup } from '@playwright/test';
import { ShokLoginPage } from '../fixtures/ShokLoginPage';

setup('Авторизация и сохранение сессии', async ({ page }) => {
  const loginPage = new ShokLoginPage(page);

  await page.goto('https://yavshok.ru/login');
  await loginPage.login('test547892@yandex.ru', 'qwerty123');
  await page.waitForURL('/');

  await page.context().storageState({ path: 'auth/cookies.json' });
});