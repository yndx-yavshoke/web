import { test, expect } from '../src/fixtures/mainPage.fixture';
import { RegisterPage } from '../src/pages/RegisterPage';
import { generateRandomEmail } from '../src/utils/emailGenerator';

test.describe('Регистрация в ШОКе', () => {
  test('Регистрация: возраст до 21 ("Ты молоденький котик")', async ({ mainPage }) => {
    const register = new RegisterPage(mainPage.page);
    await mainPage.page.goto('/register');
    const email = generateRandomEmail('youngcat');
    await register.register(email, 'password123', '18');
    await expect(mainPage.page.locator('text=Ты молоденький котик')).toBeVisible();
  });

  test('Регистрация: возраст от 21 до 68 ("Ты взрослый котик")', async ({ mainPage }) => {
    const register = new RegisterPage(mainPage.page);
    await mainPage.page.goto('/register');
    const email = generateRandomEmail('adultcat');
    await register.register(email, 'password123', '45');
    await expect(mainPage.page.locator('text=Ты взрослый котик')).toBeVisible();
  });

  test('Регистрация: возраст больше 68 ("Ты старый котик")', async ({ mainPage }) => {
    const register = new RegisterPage(mainPage.page);
    await mainPage.page.goto('/register');
    const email = generateRandomEmail('oldcat');
    await register.register(email, 'password123', '75');
    await expect(mainPage.page.locator('text=Ты старый котик')).toBeVisible();
  });

  test('Кнопка "Назад" возвращает на страницу логина', async ({ mainPage }) => {
    const register = new RegisterPage(mainPage.page);
    await mainPage.page.goto('/register');
    await register.goBack();
    await expect(mainPage.page).toHaveURL('https://yavshok.ru/login');
  });
}); 