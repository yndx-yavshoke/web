import { test, expect } from "../../fixtures";
import * as fs from "fs";
import * as path from "path";

const authPath = path.join(process.cwd(), "secrets", "auth.json");
const authData = JSON.parse(fs.readFileSync(authPath, "utf-8"));

test.beforeEach("Открыть страницу логина и проверить элементы", async ({ loginPage }) => {
  await test.step("Открываем страницу логина", async () => {
    await loginPage.open();
  });

  await test.step("Проверяем видимость элементов", async () => {
    await expect(loginPage.title).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.inShokButton).toBeVisible();
    await expect(loginPage.backButton).toBeVisible();
    await expect(loginPage.registerButton).toBeVisible();
  });
});

test("Авторизация с зарегистрированными данными", async ({ loginPage }) => {
  await test.step("Логинимся зарегистрированным пользователем", async () => {
    await loginPage.loginWithRegisteredUser();
  });

  await test.step("Проверяем переход на главную страницу", async () => {
    await expect(loginPage.page).toHaveURL("https://yavshok.ru/");
  });
});

test("Авторизация с зарегистрированной почтой и неверным паролем", async ({ loginPage }) => {
  await test.step("Открываем страницу логина", async () => {
    await loginPage.open();
  });

  await test.step("Пытаемся залогиниться с неверным паролем", async () => {
    await loginPage.login(authData.email, "catlove8912");
  });

  await test.step("Проверяем, что остались на странице логина", async () => {
    await expect(loginPage.title).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
  });
});

test("Авторизация с НЕ зарегистрированной почтой", async ({ loginPage }) => {
  await test.step("Пытаемся залогиниться с несуществующей почтой", async () => {
    await loginPage.loginWithUnregisteredUser();
  });

  await test.step("Проверяем, что остались на странице логина", async () => {
    await expect(loginPage.title).toBeVisible();
  });
});

test("Пустые поля логина", async ({ loginPage }) => {
  await test.step("Кликаем по полям и пытаемся войти с пустыми значениями", async () => {
    await loginPage.emailInput.click();
    await loginPage.passwordInput.click();
    await loginPage.inShokButton.click();
  });

  await test.step("Проверяем, что остались на странице логина", async () => {
    await expect(loginPage.title).toBeVisible();
  });
});

test("Кнопка Назад возвращает на стартовую страницу", async ({ loginPage }) => {
  await test.step("Заполняем поля зарегистрированными данными", async () => {
    await loginPage.emailInput.fill(authData.email);
    await loginPage.passwordInput.fill(authData.password);
  });

  await test.step("Нажимаем кнопку Назад", async () => {
    await loginPage.goBack();
  });

  await test.step("Проверяем переход на главную страницу", async () => {
    await expect(loginPage.page).toHaveURL("https://yavshok.ru/");
  });
});

test("Кнопка Регистрация открывает страницу регистрации", async ({ loginPage }) => {
  await test.step("Нажимаем кнопку Регистрация", async () => {
    await loginPage.goToRegister();
  });

  await test.step("Проверяем переход на страницу регистрации", async () => {
    await expect(loginPage.page).toHaveURL("https://yavshok.ru/register");
  });
});
