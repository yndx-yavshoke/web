import { expect } from "@playwright/test";
import { test } from "../fixtures/index";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ mainPage }) => {
  await test.step("Открыть главную страницу", async () => {
    await mainPage.open();
  });
  await test.step("Заголовок главной страницы отображается", async () => {
    await expect(mainPage.title).toBeVisible();
  });
});

test("Пользователь существует", async ({ mainPage }) => {
  await test.step("Поле ввода email отображается", async () => {
    await expect(mainPage.input).toBeVisible();
  });
  await test.step("Заполнить поле email значением", async () => {
    await mainPage.input.fill(process.env.TEST_USER_EMAIL!);
  });
  await test.step("Кнопка проверки отображается", async () => {
    await expect(mainPage.checkButton).toBeVisible();
  });
  await test.step("Нажать на кнопку проверки", async () => {
    await mainPage.checkButton.click();
  });
  await test.step("GIF отображается", async () => {
    await expect(mainPage.successGIF).toBeVisible();
  });
  await test.step("Сообщение об успехе отображается", async () => {
    await expect(mainPage.successTextMessage).toBeVisible();
  });
});

test("Пользователь не существует", async ({ mainPage }) => {
  await test.step("Поле ввода email отображается", async () => {
    await expect(mainPage.input).toBeVisible();
  });
  await test.step("Заполнить поле email случайным значением", async () => {
    await mainPage.input.fill(faker.internet.email());
  });
  await test.step("Кнопка проверки отображается", async () => {
    await expect(mainPage.checkButton).toBeVisible();
  });
  await test.step("Нажать на кнопку проверки", async () => {
    await mainPage.checkButton.click();
  });
  await test.step("Сообщение об ошибке отображается", async () => {
    await expect(mainPage.failedTextMessage).toBeVisible();
  });
});

test("Кнопка проверки неактивна при пустом поле ввода", async ({ mainPage }) => {
  await test.step("Поле ввода email отображается", async () => {
    await expect(mainPage.input).toBeVisible();
  });
  await test.step("Поле ввода email пустое", async () => {
    await expect(mainPage.input).toBeEmpty();
  });
  await test.step("Кнопка проверки отображается", async () => {
    await expect(mainPage.checkButton).toBeVisible();
  });
  await test.step("Нажать на кнопку проверки", async () => {
    await mainPage.checkButton.click({ force: true });
  });
  await test.step("Сообщение об успехе не отображается", async () => {
    await expect(mainPage.successTextMessage).not.toBeVisible();
  });
  await test.step("Сообщение об ошибке не отображается", async () => {
    await expect(mainPage.failedTextMessage).not.toBeVisible();
  });
});

test("Переход на страницу входа по кнопке 'Войти'", async ({ mainPage }) => {
  await test.step("Кнопка 'Войти' отображается", async () => {
    await expect(mainPage.toLoginButton).toBeVisible();
  });
  await test.step("Нажать на кнопку 'Войти'", async () => {
    await mainPage.toLoginButton.click();
  });
  await test.step("URL страницы входа корректен", async () => {
    await expect(mainPage.page).toHaveURL("/login");
  });
});
