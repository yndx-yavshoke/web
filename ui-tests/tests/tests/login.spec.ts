import { test, expect } from "../../fixtures";
import * as fs from "fs";
import * as path from "path";

const authPath = path.join(process.cwd(), "secrets", "auth.json");
const authData = JSON.parse(fs.readFileSync(authPath, "utf-8"));

test.beforeEach("Открыть страницу", async ({ loginPage }) => {
  await loginPage.open();

  await expect(loginPage.title).toBeVisible();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.inShokButton).toBeVisible();
  await expect(loginPage.backButton).toBeVisible();
  await expect(loginPage.registerButton).toBeVisible();
});

test("Авторизация с зарегистрированными данными", async ({ loginPage }) => {
  await loginPage.loginWithRegisteredUser();

  await expect(loginPage.page).toHaveURL("https://yavshok.ru/");
});

test("Авторизация с зарегестрированной почтой и неверным паролем", async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login(authData.email, "catlove8912");

  await expect(loginPage.title).toBeVisible();
  await expect(loginPage.emailInput).toBeVisible();
});

test("Авторизация с НЕ зарестрированной почтой", async ({ loginPage }) => {
  await loginPage.loginWithUnregisteredUser();

  await expect(loginPage.title).toBeVisible();
});

test("Пустые поля логина", async ({ loginPage }) => {
  await loginPage.emailInput.click();
  await loginPage.passwordInput.click();
  await loginPage.inShokButton.click();

  await expect(loginPage.title).toBeVisible();
});

test("Кнопка Назад возвращает на стартовую страницу", async ({ loginPage }) => {
  await loginPage.emailInput.fill(authData.email);
  await loginPage.passwordInput.fill(authData.password);
  await loginPage.goBack();
  await expect(loginPage.page).toHaveURL("https://yavshok.ru/");
});

test("Кнопка Регистрация открывает страницу регистрации", async ({ loginPage }) => {
  await loginPage.goToRegister();

  await expect(loginPage.page).toHaveURL("https://yavshok.ru/register");
});
