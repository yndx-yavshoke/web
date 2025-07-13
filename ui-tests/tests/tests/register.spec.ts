import { test, expect } from "../../fixtures";
import { faker } from "@faker-js/faker";

test.beforeEach("Открыть страницу", async ({ registerPage }) => {
  await registerPage.open();

  await expect(registerPage.title).toBeVisible();
  await expect(registerPage.emailInput).toBeVisible();
  await expect(registerPage.passwordInput).toBeVisible();
  await expect(registerPage.ageInput).toBeVisible();
  await expect(registerPage.registerButton).toBeVisible();
  await expect(registerPage.backButton).toBeVisible();
});

test.skip("Регистрация пользователя", async ({ registerPage }) => {
  await registerPage.registerWithRandomUser();

  await expect(registerPage.page).toHaveURL("https://yavshok.ru/");
});

test("Регистрация с пустыми полями", async ({ registerPage }) => {
  await registerPage.registerButton.click();

  await expect(registerPage.title).toBeVisible();
});

test("Регистрация с отрицательным возрастом)", async ({ registerPage }) => {
  const email = faker.internet.email();
  const password = faker.internet.password();
  await registerPage.register(email, password, "-5");

  await expect(registerPage.title).toBeVisible();
  await expect(registerPage.ageError).toBeVisible();
});

test("Регистрация с текстом вместо возраста", async ({ registerPage }) => {
  const email = faker.internet.email();
  const password = faker.internet.password();
  await registerPage.register(email, password, "abc");

  await expect(registerPage.title).toBeVisible();
});

test("Кнопка Назад возвращает на страницу логина", async ({ registerPage }) => {
  await registerPage.goBack();

  await expect(registerPage.page).toHaveURL("https://yavshok.ru/login");
});
