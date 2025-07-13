import { test, expect } from "../../fixtures";
import { faker } from "@faker-js/faker";

test.beforeEach("Открыть страницу", async ({ userProfilePage }) => {
  await userProfilePage.open();
  await expect(userProfilePage.userAvatar).toBeVisible();
  await expect(userProfilePage.userName).toBeVisible();
  await expect(userProfilePage.userStatus).toBeVisible();
  await expect(userProfilePage.logoutButton).toBeVisible();
});

test("Пользователь может изменить имя", async ({ userProfilePage }) => {
  const newName = faker.person.firstName();

  await userProfilePage.editProfileButton.click();
  await userProfilePage.inputNewName.fill(newName);
  await userProfilePage.saveButton.click();
  await expect(userProfilePage.saveButton).toHaveText("Save Changes");
  await userProfilePage.cancelButton.click();

  await expect(userProfilePage.userName).toHaveText(newName);
});

test("Имя не поменяется на базовое при отмене изменений", async ({ userProfilePage }) => {
  const oldName = await userProfilePage.userName.textContent();
  const newName = faker.person.firstName();

  await userProfilePage.editProfileButton.click();
  await userProfilePage.inputNewName.fill(newName);
  await expect(userProfilePage.saveButton).toHaveText("Save Changes");
  await userProfilePage.cancelButton.click();

  await expect(userProfilePage.userName).toHaveText(oldName);
});

test("logout выходит из аккаунта", async ({ userProfilePage }) => {
  await userProfilePage.logout();

  expect(userProfilePage.page.getByTestId("main-login-button")).toBeVisible();
});


test("Статус старого котика отображается", async ({ userProfilePage }) => {
  await userProfilePage.mockAgeFlags();
  await userProfilePage.mockUserAge(80);
  await userProfilePage.reEntry();

  await expect(userProfilePage.userStatus).toHaveText("Ты старый котик");
});

test.skip("Статус взрослого котика отображается", async ({ userProfilePage }) => {
  await userProfilePage.mockAgeFlags();
  await userProfilePage.mockUserAge(30);
  await userProfilePage.reEntry();

  await expect(userProfilePage.userStatus).toHaveText("Ты взрослый котик");
});

test("Статус молодого котика отображается", async ({ userProfilePage }) => {
  await userProfilePage.mockAgeFlags();
  await userProfilePage.mockUserAge(10);
  await userProfilePage.reEntry();

  await expect(userProfilePage.userStatus).toHaveText("Ты молоденький котик");
});

