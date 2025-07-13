import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';
import { LoginPage } from '../pages/login.page';
import { step } from 'allure-js-commons';


test('validation errors on registration attempt', async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await test.step('Navigate to register page', async () => {
    await registerPage.navigate();
  });

  await test.step('Click register button with empty form', async () => {
    await registerPage.registerButton.click();
  });

  await test.step('Expect validation errors for all required fields', async () => {
    await expect(registerPage.regEmailError).toBeVisible();
    await expect(registerPage.regPasswordError).toBeVisible();
    await expect(registerPage.regAgeError).toBeVisible();
  });
});

test('register go back button navigation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);

  await test.step('Navigate to login page', async () => {
    await loginPage.navigate();
    await expect(page).toHaveURL(/\/login/);
  });

  await test.step('Click "Register" button on login page', async () => {
    await loginPage.loginRegisterButton.click();
    await expect(page).toHaveURL(/\/register/);
  });

  await test.step('Click "Back" button on register page', async () => {
    await registerPage.backButton.click();
  });

  await test.step('Verify user is back on login page and email input is visible', async () => {
    await expect(page).toHaveURL(/\/login/);
    await expect(loginPage.emailInput).toBeVisible();
  });
});

test('user cannot register with an existing email', async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await test.step('Navigate to register page', async () => {
    await registerPage.navigate();
  });

  const existingUser = {
    email: 'test_user@yavshok.com',
    password: 'TestPass123!',
    age: '30'
  };

  await test.step(`Attempt to register with already registered email: ${existingUser.email}`, async () => {
    await registerPage.register(existingUser);
  });

  await test.step('Expect error message that email already exists', async () => {
    await expect(registerPage.emailExistsError).toBeVisible();
  });
});