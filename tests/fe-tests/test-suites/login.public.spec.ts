import { test, expect } from '@playwright/test';
import { ExistPage } from '../pages/exist.page';
import { LoginPage } from '../pages/login.page';
import { step } from 'allure-js-commons';

test('user logs in successfully with correct credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('Navigate to login page', async () => {
    await loginPage.navigate();
  });

  await test.step('Enter valid credentials and submit login form', async () => {
    await loginPage.login('q@q.q', '123456');
  });

  await test.step('Verify that logout button is visible (user is logged in)', async () => {
    await expect(page.getByText('Logout')).toBeVisible();
  });
});

test('user goes from exist page to login page via login button', async ({ page }) => {
  const existPage = new ExistPage(page);
  const loginPage = new LoginPage(page);

  await test.step('Navigate to exist page', async () => {
    await page.goto('/');
  });

  await test.step('Click "Login" button on exist page', async () => {
    await existPage.loginButton.click();
  });

  await test.step('Verify login form is visible', async () => {
    await expect(loginPage.loginButton).toBeVisible();
  });
});

test('register button leads to registration', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('Navigate to login page', async () => {
    await page.goto('/login');
  });

  await test.step('Click "Register" button', async () => {
    await loginPage.goToRegister();
  });

  await test.step('Verify URL is /register', async () => {
    await expect(page).toHaveURL('/register');
  });
});

test('validation errors when login form is submitted empty', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('Navigate to login page', async () => {
    await page.goto('/login');
  });

  await test.step('Click submit without filling login form', async () => {
    await loginPage.loginButton.click();
  });

  await test.step('Verify validation messages are shown', async () => {
    await expect(loginPage.emailError).toBeVisible();
    await expect(loginPage.passwordError).toBeVisible();
  });
});

test('login go back button navigation', async ({ page }) => {
  const existPage = new ExistPage(page);
  const loginPage = new LoginPage(page);

  await test.step('Navigate to exist page', async () => {
    await page.goto('/');
  });

  await test.step('Click "Login" button on exist page', async () => {
    await existPage.goToLogin();
  });

  await test.step('Verify URL is /login', async () => {
    await expect(page).toHaveURL(/\/login$/);
  });

  await test.step('Click "Back" button on login page', async () => {
    await loginPage.loginBackButton.click();
  });

  await test.step('Verify URL is back to / and main login button is visible', async () => {
    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('main-login-button')).toBeVisible();
  });
});