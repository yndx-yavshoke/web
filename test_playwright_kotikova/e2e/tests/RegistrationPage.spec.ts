import { test, expect } from '@playwright/test';
import { generateTestUser } from '../test-data/users';

test.describe('Страница регистрации', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('Должны отображаться все поля ввода и кнопка регистрации', async ({ page }) => {
    const emailInput = page.getByTestId('register-email-input');
    const passwordInput = page.getByTestId('register-password-input');
    const ageInput = page.getByTestId('register-age-input');
    const submitButton = page.getByTestId('register-submit-button');

    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('placeholder', 'Email');

    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('placeholder', 'Пароль');

    await expect(ageInput).toBeVisible();
    await expect(ageInput).toHaveAttribute('placeholder', 'Возраст');
  });

  
  test('Успешная регистрация', async ({ page }) => {
    const user = generateTestUser();
    await page.getByTestId('register-email-input').fill(user.email);
    await page.getByTestId('register-password-input').fill(user.password);
    await page.getByTestId('register-age-input').fill(user.age.toString());
    await page.getByTestId('register-submit-button').click();
    await expect(page).toHaveURL('https://yavshok.ru/');
});

});
