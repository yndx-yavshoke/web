import { test, expect } from "../../fixtures";
import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";

const authPath = path.join(process.cwd(), "secrets", "auth.json");
const authData = JSON.parse(fs.readFileSync(authPath, "utf-8"));
const noRegEmail = faker.internet.email();

test.beforeEach("Открыть страницу", async ({ mainPage }) => {
  await mainPage.open();

  await expect(mainPage.title).toBeVisible();
  await expect(mainPage.input).toBeVisible();
  await expect(mainPage.shokCheckButton).toBeVisible();
  await expect(mainPage.toLoginButton).toBeVisible();
});

test("Зарегестрированная почта", async ({ mainPage }) => {
  await mainPage.checkEmail(authData.email);

  await expect(mainPage.inShokTest).toBeVisible();
  await expect(mainPage.catGif).toBeVisible();
});

test("НЕзарегестрированная почта", async ({ mainPage }) => {
  await mainPage.checkEmail(noRegEmail);

  await expect(mainPage.notInShokText).toBeVisible();
});

test("Пустое поле почты", async ({ mainPage }) => {
  await mainPage.input.click();
  await mainPage.shokCheckButton.click();

  await expect(mainPage.notInShokText).not.toBeVisible();
  await expect(mainPage.inShokTest).not.toBeVisible();
  await expect(mainPage.catGif).not.toBeVisible();
});
