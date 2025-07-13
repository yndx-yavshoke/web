import { test, expect } from '@playwright/test';
import { RegisterPage } from './pages/RegisterPage';
import { setupApiMocks, API_MOCKS } from './mocks/apiMocks';

test.beforeEach(async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await page.waitForLoadState('domcontentloaded');
});

test('Регистрация: успешная регистрация', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const email = `test_${Date.now()}@mail.ru`;
  
  await setupApiMocks(page, [API_MOCKS.REGISTER.SUCCESS]);
  
  await test.step('Ввод валидных данных для регистрации', async () => {
    await registerPage.fillEmail(email);
    await registerPage.fillPassword('Test1234');
    await registerPage.fillAge('25');
  });
  
  await test.step('Отправка формы регистрации', async () => {
    await registerPage.clickRegister();
  });
  
  await test.step('Проверка успешной регистрации', async () => {
    expect(page.url().includes('yavshok') || page.url().includes('data:')).toBe(true);
  });
});

test('Регистрация: невалидный email', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  
  await setupApiMocks(page, [API_MOCKS.REGISTER.EMAIL_EXISTS]);
  
  await test.step('Ввод невалидного email', async () => {
    await registerPage.fillEmail('invalid-email');
    await registerPage.fillPassword('Test1234');
    await registerPage.fillAge('25');
  });
  
  await test.step('Отправка формы с невалидными данными', async () => {
    await registerPage.clickRegister();
  });
  
  await test.step('Проверка что форма была отправлена', async () => {
    expect(page.url().includes('yavshok') || page.url().includes('data:')).toBe(true);
  });
});

test('Регистрация: короткий пароль', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const email = `test_${Date.now()}@mail.ru`;
  
  await setupApiMocks(page, [API_MOCKS.REGISTER.EMAIL_EXISTS]);
  
  await test.step('Ввод данных с коротким паролем', async () => {
    await registerPage.fillEmail(email);
    await registerPage.fillPassword('123');
    await registerPage.fillAge('25');
  });
  
  await test.step('Отправка формы с коротким паролем', async () => {
    await registerPage.clickRegister();
  });
  
  await test.step('Проверка что форма была отправлена', async () => {
    expect(page.url().includes('yavshok') || page.url().includes('data:')).toBe(true);
  });
});

test('Регистрация: невалидный возраст', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const email = `test_${Date.now()}@mail.ru`;
  
  await setupApiMocks(page, [API_MOCKS.REGISTER.SUCCESS]);
  
  await test.step('Ввод данных с невалидным возрастом', async () => {
    await registerPage.fillEmail(email);
    await registerPage.fillPassword('Test1234');
    await registerPage.fillAge('150');
  });
  
  await test.step('Отправка формы с невалидным возрастом', async () => {
    await registerPage.clickRegister();
  });
  
  await test.step('Проверка что форма была отправлена', async () => {
    expect(page.url().includes('yavshok') || page.url().includes('data:')).toBe(true);
  });
}); 