import { test, expect } from '../src/fixtures/mainPage.fixture';
import { LoginPage } from '../src/pages/LoginPage';
import { generateRandomEmail } from '../src/utils/emailGenerator';

test.describe('Страница логина /login', () => {
  test('Успешный вход с валидными данными', async ({ mainPage }) => {
    const login = new LoginPage(mainPage.page);
    await mainPage.page.goto('/login');
    await login.login('e.sheluddd+145@gmail.com', '123123');
    await expect(mainPage.page.locator('[data-testid="user-logout-button"]')).toBeVisible();
  });

  test('Ошибка при несуществующих данных', async ({ mainPage }) => {
    const login = new LoginPage(mainPage.page);
    await mainPage.page.goto('/login');
    const randomEmail = generateRandomEmail('nonexistent');
    await login.login(randomEmail, 'wrongpassword');
    await expect(mainPage.page).toHaveURL(/\/login$/);
  });

  test('Ошибка при входе без пароля', async ({ mainPage }) => {
    const login = new LoginPage(mainPage.page);
    await mainPage.page.goto('/login');
    await login.loginWithoutPassword('e.sheluddd+145@gmail.com');
    await expect(mainPage.page).toHaveURL(/\/login$/);
  });

  test('Ошибка при невалидном email (цифры)', async ({ mainPage }) => {
    const login = new LoginPage(mainPage.page);
    await mainPage.page.goto('/login');
    await login.login('123456', 'password123');
    await expect(mainPage.page).toHaveURL(/\/login$/);
  });

  test('Кнопка "Назад" возвращает на главную страницу', async ({ mainPage }) => {
    const login = new LoginPage(mainPage.page);
    await mainPage.page.goto('/login');
    await login.goBack();
    await expect(mainPage.page).toHaveURL('https://yavshok.ru/');
  });

  test('Кнопка "Регистрация" ведет на страницу регистрации', async ({ mainPage }) => {
    const login = new LoginPage(mainPage.page);
    await mainPage.page.goto('/login');
    await login.goToRegister();
    await expect(mainPage.page).toHaveURL(/\/register$/);
  });
}); 