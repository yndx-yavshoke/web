import { test as setup } from '@playwright/test';
import { ShockAuth } from '../fixtures/loginPageFixture';

setup('Авторизация и сохранение сессии', async ({ page }) => {
  const loginPage = new ShockAuth(page);

  await page.goto('https://yavshok.ru/login');
  await loginPage.signIn('abra@mail.ru', 'cadabra');
  await page.waitForURL('/');

  await page.context().storageState({ path: 'tests/authorization/cookies.json' });
});