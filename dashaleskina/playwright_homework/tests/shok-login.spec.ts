import { expect } from "@playwright/test";
import { test } from "../fixtures/index";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ loginPage }) => {
  await test.step("Открыть страницу входа", async () => {
    await loginPage.open();
  });
  await test.step("Заголовок страницы входа отображается", async () => {
    await expect(loginPage.title).toBeVisible();
  });
});

test("Успешный вход в систему", async ({ loginPage, userPage }) => {
  await test.step("Поле email отображается", async () => {
    await expect(loginPage.emailInput).toBeVisible();
  });
  await test.step("Заполнить поле email значением", async () => {
    await loginPage.emailInput.fill(process.env.TEST_USER_EMAIL!);
  });
  await test.step("Поле пароля отображается", async () => {
    await expect(loginPage.passwordInput).toBeVisible();
  });
  await test.step("Заполнить поле пароля значением", async () => {
    await loginPage.passwordInput.fill(process.env.TEST_USER_PASSWORD!);
  });
  await test.step("Кнопка входа отображается", async () => {
    await expect(loginPage.loginButton).toBeVisible();
  });
  await test.step("Нажать на кнопку входа", async () => {
    await loginPage.loginButton.click();
  });
  await test.step("Кнопка выхода отображается на странице пользователя", async () => {
    await expect(userPage.logoutButton).toBeVisible();
  });
});

test("Вход с неверным паролем", async ({ loginPage }) => {
  await test.step("Поле email отображается", async () => {
    await expect(loginPage.emailInput).toBeVisible();
  });
  await test.step("Заполнить поле email значением", async () => {
    await loginPage.emailInput.fill(process.env.TEST_USER_EMAIL!);
  });
  await test.step("Поле пароля отображается", async () => {
    await expect(loginPage.passwordInput).toBeVisible();
  });
  await test.step("Заполнить поле пароля случайным значением", async () => {
    await loginPage.passwordInput.fill(faker.internet.password({ length: 7 }));
  });
  await test.step("Кнопка входа отображается", async () => {
    await expect(loginPage.loginButton).toBeVisible();
  });
  await test.step("Нажать на кнопку входа", async () => {
    await loginPage.loginButton.click();
  });
  await test.step("Сообщение об ошибке отображается на странице", async () => {
    await expect(loginPage.authErrorMessage).toBeVisible();
  });
});

test("Вход с пустыми полями", async ({ loginPage }) => {
  await test.step("Поле email отображается", async () => {
    await expect(loginPage.emailInput).toBeVisible();
  });
  await test.step("Поле email пустое", async () => {
    await expect(loginPage.emailInput).toBeEmpty();
  });
  await test.step("Поле пароля отображается", async () => {
    await expect(loginPage.passwordInput).toBeVisible();
  });
  await test.step("Поле пароля пустое", async () => {
    await expect(loginPage.passwordInput).toBeEmpty();
  });
  await test.step("Кнопка входа отображается", async () => {
    await expect(loginPage.loginButton).toBeVisible();
  });
  await test.step("Нажать на кнопку входа", async () => {
    await loginPage.loginButton.click({ force: true });
  });
  await test.step("Сообщение о необходимости заполнения email отображается", async () => {
    await expect(loginPage.emailRequiredMessage).toBeVisible();
  });
  await test.step("Сообщение о необходимости заполнения пароля отображается", async () => {
    await expect(loginPage.passwordRequiredMessage).toBeVisible();
  });
});

test("Переход на страницу регистрации по кнопке 'Регистрация'", async ({ loginPage, registerPage }) => {
  await test.step("Кнопка 'Регистрация' отображается", async () => {
    await expect(loginPage.registerButton).toBeVisible();
  });
  await test.step("Нажать на кнопку 'Регистрация'", async () => {
    await loginPage.registerButton.click();
  });
  await test.step("Заголовок страницы регистрации отображается", async () => {
    await expect(registerPage.title).toBeVisible();
  });
  await test.step("URL страницы регистрации корректен", async () => {
    await expect(registerPage.page).toHaveURL("/register");
  });
});
