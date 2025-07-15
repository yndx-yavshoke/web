import { test, expect } from "../../fixtures";
import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";

const authPath = path.join(process.cwd(), "secrets", "auth.json");
const authData = JSON.parse(fs.readFileSync(authPath, "utf-8"));
const noRegEmail = faker.internet.email();

test.beforeEach("Открыть главную страницу и проверить элементы", async ({ mainPage }) => {
  await test.step("Открываем главную страницу", async () => {
    await mainPage.open();
  });

  await test.step("Проверяем видимость элементов", async () => {
    await expect(mainPage.title).toBeVisible();
    await expect(mainPage.input).toBeVisible();
    await expect(mainPage.shokCheckButton).toBeVisible();
    await expect(mainPage.toLoginButton).toBeVisible();
  });
});

test("Проверка на ШОКовость с зарегистрированной почтой", async ({ mainPage }) => {
  await test.step(`Проверяем существующую почту: ${authData.email}`, async () => {
    await mainPage.checkEmail(authData.email);
  });

  await test.step("Ожидаем, что видны подтверждение и гифка", async () => {
    await expect(mainPage.inShokTest).toBeVisible();
    await expect(mainPage.catGif).toBeVisible();
  });
});

test("Проверка на ШОКовость с НЕзарегистрированной почтой", async ({ mainPage }) => {
  await test.step(`Проверяем несуществующую почту: ${noRegEmail}`, async () => {
    await mainPage.checkEmail(noRegEmail);
  });

  await test.step("Ожидаем, что появляется сообщение о несуществующей почте", async () => {
    await expect(mainPage.notInShokText).toBeVisible();
  });
});

test("Пустое поле почты", async ({ mainPage }) => {
  await test.step("Кликаем в поле почты и пытаемся проверить без ввода", async () => {
    await mainPage.input.click();
    await mainPage.shokCheckButton.click();
  });

  await test.step("Ожидаем, что сообщения и гифка не видны", async () => {
    await expect(mainPage.notInShokText).not.toBeVisible();
    await expect(mainPage.inShokTest).not.toBeVisible();
    await expect(mainPage.catGif).not.toBeVisible();
  });
});
