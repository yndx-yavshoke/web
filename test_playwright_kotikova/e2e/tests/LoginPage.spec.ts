import { test, expect } from '@playwright/test';
import { generateUnregisteredEmail } from '../test-data/users';
import { validUser } from '../fixtures/valid_user';

test.describe('Авторизация', () => {
  // UI-тесты - без авторизации
  test.describe('Валидация UI элементов', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
    });

    test('Поля формы имеют корректные атрибуты', async ({ page }) => {
      const emailInput = page.getByTestId('login-email-input');
      const passwordInput = page.getByTestId('login-password-input');
      const loginButton = page.getByTestId('login-submit-button');

      await expect(emailInput).toBeVisible();
      await expect(emailInput).toHaveAttribute('placeholder', 'Email');
      await expect(passwordInput).toBeVisible();
      await expect(passwordInput).toHaveAttribute('placeholder', 'Пароль');
      await expect(loginButton).toBeVisible();
    });
  });

  // Функциональные тесты - с авторизацией
  test.describe('Функциональные тесты', () => {
    test('Успешная авторизация', async ({ page }) => {
    // Заполняем форму валидными данными
    await page.goto('/login');
    await page.getByTestId('login-email-input').fill(validUser.email);
    await page.getByTestId('login-password-input').fill(validUser.password);
    await page.getByTestId('login-submit-button').click();

    // Проверяем успешный вход
    await expect(page).toHaveURL('https://yavshok.ru/'); // Редирект после входа
  
  });
  });

  // Негативные тесты - без авторизации
  test.describe('Негативные сценарии', () => {
    test('Ошибка при неверном пароле', async ({ page }) => {
      await page.goto('/login');
      await page.getByTestId('login-email-input').fill('test@user.com');
      await page.getByTestId('login-password-input').fill('wrongpassword11111');
      await page.getByTestId('login-submit-button').click();
      await expect(page.getByText('Неправильный логин или пароль')).toBeVisible();
    });

    test('Ошибка при несуществующем email', async ({ page }) => {
      await page.goto('/login');
      await page.getByTestId('login-email-input').fill(generateUnregisteredEmail());
      await page.getByTestId('login-password-input').fill('anypassword');
      await page.getByTestId('login-submit-button').click();
      await expect(page.getByText('Неправильный логин или пароль')).toBeVisible();
    });

    test('Валидация пустых полей', async ({ page }) => {
      await page.goto('/login');
      await page.getByTestId('login-submit-button').click();
      await expect(page.getByText('Введите email')).toBeVisible();
      await expect(page.getByText('Введите пароль')).toBeVisible();
    });
  });
});