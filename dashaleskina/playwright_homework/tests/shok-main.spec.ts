import { expect } from "@playwright/test";
import { test } from "../fixtures/index";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.open();
  await expect(mainPage.title).toBeVisible();
});

test("User exists", async ({ mainPage }) => {
  await mainPage.checkEmail(process.env.TEST_USER_EMAIL!);
  await expect(mainPage.successGIF).toBeVisible();
  await expect(mainPage.successTextMessage).toBeVisible();
});

test("User does not exists", async ({ mainPage }) => {
  await mainPage.checkEmail(faker.internet.email());
  await expect(mainPage.failedTextMessage).toBeVisible();
});

test("Check button disabled when input empty", async ({ mainPage }) => {
  await expect(mainPage.input).toBeEmpty();
  await mainPage.checkButton.click({ force: true });
  await expect(mainPage.successTextMessage).not.toBeVisible();
  await expect(mainPage.failedTextMessage).not.toBeVisible();
});

test("Clicking toLoginButton navigates to login page", async ({ mainPage }) => {
  await mainPage.toLoginButton.click();
  await expect(mainPage.page).toHaveURL("/login");
});
