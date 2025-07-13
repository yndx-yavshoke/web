import { chromium, FullConfig } from '@playwright/test';
import { generateTestUser } from '../test-data/users';
import fs from 'fs/promises'; 

const userAuthFile = 'playwright/.auth/user.json';

async function globalSetup(config: FullConfig) {
  // Запускаем браузер
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Генерируем тестовые данные пользователя
  const userData = generateTestUser();

  // Шаг 1: Регистрация нового пользователя
  await page.goto('https://yavshok.ru/register');
  await page.getByTestId('register-email-input').fill(userData.email);
  await page.getByTestId('register-password-input').fill(userData.password);
  await page.getByTestId('register-age-input').fill(userData.age.toString());
  await page.getByTestId('register-submit-button').click();

  // Шаг 2: Авторизация (если требуется)
  await page.goto('https://yavshok.ru/login');
  await page.getByTestId('login-email-input').fill(userData.email);
  await page.getByTestId('login-password-input').fill(userData.password);
  await page.getByTestId('login-submit-button').click();
  await page.waitForNavigation();

  // Шаг 3: Сохраняем storageState
  const storage = await page.context().storageState();

  // Добавляем email к сохранённому состоянию
  const combinedData = {
    email: userData.email,
    ...storage,
  };

  await fs.mkdir('playwright/.auth', { recursive: true });

  // Записываем файл с состоянием и email
  await fs.writeFile(userAuthFile, JSON.stringify(combinedData, null, 2));

  // Закрываем браузер
  await browser.close();
}

export default globalSetup;

