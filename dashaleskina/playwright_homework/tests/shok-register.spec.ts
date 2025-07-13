import { expect } from "@playwright/test";
import { test } from "../fixtures/index";
import { faker } from "@faker-js/faker";

test.describe("Регистрация", () => {
  test.beforeEach(async ({ registerPage }) => {
    await test.step("Открыть страницу регистрации", async () => {
      await registerPage.open();
    });
    await test.step("Поле email отображается", async () => {
      await expect(registerPage.emailInput).toBeVisible();
    });
    await test.step("Поле пароля отображается", async () => {
      await expect(registerPage.passwordInput).toBeVisible();
    });
    await test.step("Поле возраста отображается", async () => {
      await expect(registerPage.ageInput).toBeVisible();
    });
    await test.step("Кнопка регистрации отображается", async () => {
      await expect(registerPage.registerButton).toBeVisible();
    });
  });

  test.skip("Успешная регистрация нового пользователя", async ({ registerPage, userPage }) => {
    const newEmail = faker.internet.email();
    const newPassword = faker.internet.password({ length: 6 });
    const newAge = faker.number.int({ min: 0, max: 99 });
    await test.step("Заполнить все поля значениями", async () => {
      await registerPage.fillFields({
        email: newEmail,
        password: newPassword,
        age: newAge,
      });
    });
    await test.step("Имя пользователя отображается на странице профиля", async () => {
      await expect(userPage.userName).toContainText("Neko");
    });
  });

  test("Регистрация существующего пользователя", async ({ registerPage }) => {
    const existEmail = process.env.TEST_USER_EMAIL;
    const newPassword = faker.internet.password();
    const newAge = faker.number.int({ min: 0, max: 99 });
    await test.step("Заполнить все поля значениями", async () => {
      await registerPage.fillFields({
        email: existEmail,
        password: newPassword,
        age: newAge,
      });
    });
    await test.step("Сообщение о существующем пользователе отображается", async () => {
      await expect(registerPage.existUserMessage).toBeVisible();
    });
  });

  test("Регистрация с пустыми полями", async ({ registerPage }) => {
    await test.step("Поле email пустое", async () => {
      await expect(registerPage.emailInput).toBeEmpty();
    });
    await test.step("Поле пароля пустое", async () => {
      await expect(registerPage.passwordInput).toBeEmpty();
    });
    await test.step("Поле возраста пустое", async () => {
      await expect(registerPage.ageInput).toBeEmpty();
    });
    await test.step("Нажать на кнопку регистрации", async () => {
      await registerPage.registerButton.click();
    });
    await test.step("Сообщение о необходимости заполнения email отображается", async () => {
      await expect(registerPage.emailRequiredMessage).toBeVisible();
    });
    await test.step("Сообщение о необходимости заполнения пароля отображается", async () => {
      await expect(registerPage.passwordRequiredMessage).toBeVisible();
    });
    await test.step("Сообщение о необходимости заполнения возраста отображается", async () => {
      await expect(registerPage.ageRequiredMessage).toBeVisible();
    });
  });

  test("Регистрация с некорректным email", async ({ registerPage }) => {
    const invalidEmail = faker.internet.username();
    const newPassword = faker.internet.password();
    const newAge = faker.number.int({ min: 0, max: 99 });
    await test.step("Заполнить все поля значениями", async () => {
      await registerPage.fillFields({
        email: invalidEmail,
        password: newPassword,
        age: newAge,
      });
    });
    await test.step("Сообщение о некорректном email отображается", async () => {
      await expect(registerPage.wrongEmailMessage).toBeVisible();
    });
  });

  test("Регистрация со слишком коротким паролем", async ({ registerPage }) => {
    const invalidEmail = faker.internet.email();
    const shortPassword = faker.internet.password({ length: 4 });
    const newAge = faker.number.int({ min: 0, max: 99 });
    await test.step("Заполнить все поля значениями", async () => {
      await registerPage.fillFields({
        email: invalidEmail,
        password: shortPassword,
        age: newAge,
      });
    });
    await test.step("Сообщение о слишком коротком пароле отображается", async () => {
      await expect(registerPage.tooShortPasswordMessage).toBeVisible();
    });
  });

  test("Регистрация с нечисловым возрастом", async ({ registerPage }) => {
    const invalidEmail = faker.internet.email();
    const newPassword = faker.internet.password();
    const invalidAge = faker.word.noun();
    await test.step("Заполнить все поля значениями", async () => {
      await registerPage.fillFields({
        email: invalidEmail,
        password: newPassword,
        age: invalidAge,
      });
    });
    await test.step("Сообщение о неверном формате возраста отображается", async () => {
      await expect(registerPage.notNumericAgeMessage).toBeVisible();
    });
  });
});

test("Переход назад по кнопке 'Назад'", async ({ registerPage, loginPage }) => {
  await test.step("Открыть страницу регистрации", async () => {
    await registerPage.open();
  });
  await test.step("Кнопка 'Назад' отображается", async () => {
    await expect(registerPage.backButton).toBeVisible();
  });
  await test.step("Нажать на кнопку 'Назад'", async () => {
    await registerPage.backButton.click();
  });
  await test.step("Заголовок страницы входа отображается", async () => {
    await expect(loginPage.title).toBeVisible();
  });
});
