import { expect } from "@playwright/test";
import { test } from "../fixtures/index";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.open();
  await expect(loginPage.title).toBeVisible();
});

test("Successful login", async ({ loginPage, userPage }) => {
  await loginPage.emailInput.fill(process.env.TEST_USER_EMAIL!);
  await loginPage.passwordInput.fill(process.env.TEST_USER_PASSWORD!);
  await loginPage.loginButton.click();
  await expect(userPage.logoutButton).toBeVisible();
});

test("Login with wrong password", async ({ loginPage }) => {
  await loginPage.emailInput.fill(process.env.TEST_USER_EMAIL!);
  await loginPage.passwordInput.fill(faker.internet.password({ length: 7 }));
  await loginPage.loginButton.click();
  await expect(loginPage.authErrorMessage).toBeVisible();
});

test("Login with empty fields", async ({ loginPage }) => {
  await expect(loginPage.emailInput).toBeEmpty();
  await expect(loginPage.passwordInput).toBeEmpty();
  await loginPage.loginButton.click({ force: true });
  await expect(loginPage.emailRequiredMessage).toBeVisible();
  await expect(loginPage.passwordRequiredMessage).toBeVisible();
});

test("Push 'Регистрация' button", async ({ loginPage, registerPage }) => {
  await loginPage.registerButton.click();
  await expect(registerPage.title).toBeVisible();
  await expect(registerPage.page).toHaveURL("/register");
});
