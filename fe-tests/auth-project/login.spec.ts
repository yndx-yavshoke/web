import { test } from '@playwright/test';

test('login and save session', async ({ page }) => {
  await page.goto('https://yavshok.ru/login');

  // Вводим логин и пароль
  await page.getByTestId('login-email-input').click();
  await page.getByTestId('login-email-input').fill('qwe1qwe@mail.ru');
  await page.getByTestId('login-password-input').fill('111111');

  // Жмём на кнопку входа
  await page.getByTestId('login-submit-button').getByText('В шок').click();

  // Делаем паузу, чтобы успели установиться куки
  await page.waitForTimeout(3000);

  // Сохраняем сессию в auth.json
  await page.context().storageState({ path: 'auth-project/auth.json' });
});
