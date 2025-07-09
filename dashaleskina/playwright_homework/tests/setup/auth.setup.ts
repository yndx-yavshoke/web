import { expect } from "@playwright/test";
import { test } from "../../fixtures/index";

test("login", async ({ page, loginPage, userPage }) => {
  await loginPage.open();

  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "В проекте используются переменные окружения - установи TEST_USER_EMAIL и TEST_USER_PASSWORD .env файле. Пример - env.example"
    );
  }

  await loginPage.emailInput.fill(email);
  await loginPage.passwordInput.fill(password);
  await loginPage.loginButton.click();

  await expect(userPage.logoutButton).toBeVisible();
  await page.context().storageState({ path: "./tests/setup/.auth/user.json" });
});
