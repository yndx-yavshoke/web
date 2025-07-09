import { expect } from "@playwright/test";
import { test } from "../fixtures/index";
import { faker } from "@faker-js/faker";

test.use({ storageState: "tests/setup/.auth/user.json" });

test.beforeEach(async ({ userPage, editProfilePage }) => {
  await userPage.open();
  await userPage.editProfileButton.click();
  await expect(editProfilePage.title).toBeVisible();
});

test("Check change name function", async ({ userPage, editProfilePage }) => {
  const newName = faker.internet.username();
  await editProfilePage.nameInput.fill(newName);
  await editProfilePage.saveButton.click();
  await expect(editProfilePage.saveButton).toContainText("Save Changes");
  await editProfilePage.cancelButton.click();

  await expect(userPage.editProfileButton).toBeVisible();
  await expect(userPage.userName).toContainText(newName);
});

test("Click 'Save Changes' button with empty field", async ({
  editProfilePage,
}) => {
  await editProfilePage.nameInput.clear();
  await expect(editProfilePage.nameInput).toBeEmpty();
  await editProfilePage.saveButton.click();
  await expect(editProfilePage.nameRequiredMessage).toBeVisible();
});
