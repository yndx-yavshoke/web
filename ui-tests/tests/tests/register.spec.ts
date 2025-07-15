import { test, expect } from "../../fixtures";
import { faker } from "@faker-js/faker";

test.beforeEach("Открыть страницу регистрации и проверить элементы", async ({ registerPage }) => {
  await test.step("Открываем страницу регистрации", async () => {
    await registerPage.open();
  });

  await test.step("Проверяем видимость элементов", async () => {
    await expect(registerPage.title).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.ageInput).toBeVisible();
    await expect(registerPage.registerButton).toBeVisible();
    await expect(registerPage.backButton).toBeVisible();
  });
});

test.skip("Регистрация пользователя", async ({ registerPage }) => {
  await test.step("Регистрируем пользователя с рандомными данными", async () => {
    await registerPage.registerWithRandomUser();
  });

  await test.step("Ожидаем переход на главную страницу после успешной регистрации", async () => {
    await expect(registerPage.page).toHaveURL("https://yavshok.ru/");
  });
});

test("Регистрация с пустыми полями", async ({ registerPage }) => {
  await test.step("Нажимаем кнопку регистрации без заполнения полей", async () => {
    await registerPage.registerButton.click();
  });

  await test.step("Ожидаем, что остались на странице регистрации", async () => {
    await expect(registerPage.title).toBeVisible();
  });
});

test("Регистрация с отрицательным возрастом", async ({ registerPage }) => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  await test.step(`Регистрируем с email=${email}, password=***, возраст=-5`, async () => {
    await registerPage.register(email, password, "-5");
  });

  await test.step("Ожидаем увидеть ошибку", async () => {
    await expect(registerPage.title).toBeVisible();
    await expect(registerPage.ageError).toBeVisible();
  });
});

test("Регистрация с текстом вместо возраста", async ({ registerPage }) => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  await test.step(`Регистрируем с email=${email}, password=***, возраст='abc'`, async () => {
    await registerPage.register(email, password, "abc");
  });

  await test.step("Ожидаем увидеть ошибку", async () => {
    await expect(registerPage.title).toBeVisible();
    await expect(registerPage.ageError).toBeVisible();
  });
});

test("Кнопка Назад возвращает на страницу логина", async ({ registerPage }) => {
  await test.step("Нажимаем кнопку Назад", async () => {
    await registerPage.goBack();
  });

  await test.step("Ожидаем перейти на страницу логина", async () => {
    await expect(registerPage.page).toHaveURL("https://yavshok.ru/login");
  });
});
