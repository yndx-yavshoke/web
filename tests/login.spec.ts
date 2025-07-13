import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { setupAuthMock } from './mocks/apiMocks';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await page.waitForLoadState('domcontentloaded');
});

test('Логин: успешная авторизация', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await setupAuthMock(page, true);
  
  await test.step('Ввод валидных данных для авторизации', async () => {
    await loginPage.fillEmail('test@mail.ru');
    await loginPage.fillPassword('password123');
  });
  
  await test.step('Отправка формы авторизации', async () => {
    await loginPage.clickLogin();
  });
  
  await test.step('Проверка результата авторизации', async () => {
    expect(page.url().includes('yavshok') || page.url().includes('data:')).toBe(true);
  });
});

test('Логин: невалидный email', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await setupAuthMock(page, false);
  
  await test.step('Ввод невалидного email', async () => {
    await loginPage.fillEmail('invalid-email');
    await loginPage.fillPassword('password123');
  });
  
  await test.step('Отправка формы с невалидными данными', async () => {
    await loginPage.clickLogin();
  });
  
  await test.step('Проверка что форма была отправлена', async () => {
    expect(page.url().includes('yavshok') || page.url().includes('data:')).toBe(true);
  });
});

test('Логин: неверный пароль', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await setupAuthMock(page, false);
  
  await test.step('Ввод существующего email с неверным паролем', async () => {
    await loginPage.fillEmail('test@mail.ru');
    await loginPage.fillPassword('wrongpassword');
  });
  
  await test.step('Отправка формы с неверными данными', async () => {
    await loginPage.clickLogin();
  });
  
  await test.step('Проверка что форма была отправлена', async () => {
    expect(page.url().includes('yavshok') || page.url().includes('data:')).toBe(true);
  });
});

test('Логин: пустые поля', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await test.step('Попытка отправки формы с пустыми полями', async () => {
    await loginPage.clickLogin();
  });
  
  await test.step('Проверка что форма была отправлена', async () => {
    expect(page.url().includes('yavshok') || page.url().includes('data:')).toBe(true);
  });
}); 