import { expect } from "@playwright/test";
import { test } from "../fixtures/index";
import { faker } from "@faker-js/faker";

test.skip("Successful new user register", async ({
  registerPage,
  userPage,
}) => {
  await registerPage.open();

  const newEmail = faker.internet.email();
  const newPassword = faker.internet.password({ length: 6 });
  const newAge = faker.number.int({ min: 0, max: 99 });
  await registerPage.fillFields({
    email: newEmail,
    password: newPassword,
    age: newAge,
  });
  await expect(userPage.userName).toContainText("Neko");
});

test("Register of exist user", async ({ registerPage }) => {
  await registerPage.open();
  const existEmail = process.env.TEST_USER_EMAIL;
  const newPassword = faker.internet.password();
  const newAge = faker.number.int({ min: 0, max: 99 });
  await registerPage.fillFields({
    email: existEmail,
    password: newPassword,
    age: newAge,
  });
  await expect(registerPage.existUserMessage).toBeVisible();
});

test("Register with all empty fields", async ({ registerPage }) => {
  await registerPage.open();
  await expect(registerPage.emailInput).toBeEmpty();
  await expect(registerPage.passwordInput).toBeEmpty();
  await expect(registerPage.ageInput).toBeEmpty();
  await registerPage.registerButton.click();
  await expect(registerPage.emailRequiredMessage).toBeVisible();
  await expect(registerPage.passwordRequiredMessage).toBeVisible();
  await expect(registerPage.ageRequiredMessage).toBeVisible();
});

test("Register with invalid email", async ({ registerPage }) => {
  await registerPage.open();
  const invalidEmail = faker.internet.username();
  const newPassword = faker.internet.password();
  const newAge = faker.number.int({ min: 0, max: 99 });
  await registerPage.fillFields({
    email: invalidEmail,
    password: newPassword,
    age: newAge,
  });
  await expect(registerPage.wrongEmailMessage).toBeVisible();
});

test("Register with too short password", async ({ registerPage }) => {
  await registerPage.open();
  const invalidEmail = faker.internet.email();
  const shortPassword = faker.internet.password({ length: 4 });
  const newAge = faker.number.int({ min: 0, max: 99 });
  await registerPage.fillFields({
    email: invalidEmail,
    password: shortPassword,
    age: newAge,
  });
  await expect(registerPage.tooShortPasswordMessage).toBeVisible();
});

test("Register with non numeric age", async ({ registerPage }) => {
  await registerPage.open();
  const invalidEmail = faker.internet.email();
  const newPassword = faker.internet.password();
  const invalidAge = faker.word.noun();
  await registerPage.fillFields({
    email: invalidEmail,
    password: newPassword,
    age: invalidAge,
  });
  await expect(registerPage.notNumericAgeMessage).toBeVisible();
});

test("Click 'Back' button", async ({ registerPage, loginPage }) => {
  await registerPage.open();
  await registerPage.backButton.click();
  await expect(loginPage.title).toBeVisible();
});
