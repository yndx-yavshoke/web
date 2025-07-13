import { expect } from "@playwright/test";
import { test } from "../fixtures/index";
import { faker } from "@faker-js/faker";

test.use({ storageState: "tests/setup/.auth/user.json" });

test.beforeEach(async ({ userPage, editProfilePage }) => {
  await test.step("Открыть профиль пользователя", async () => {
    await userPage.open();
  });
  await test.step("Кнопка изменения профиля отображается", async () => {
    await expect(userPage.editProfileButton).toBeVisible();
  });
  await test.step("Нажать кнопку сохранения", async () => {
    await userPage.editProfileButton.click();
  });
  await test.step("Пользователь находится на странице редактирования профиля", async () => {
    await expect(editProfilePage.title).toBeVisible();
  });
});

test("Проверка функции изменения имени на странице редактирования профиля", async ({
  userPage,
  editProfilePage,
}) => {
  const newName = faker.internet.username();
  await test.step("Заполнить имя сгенерированным значением", async () => {
    await editProfilePage.nameInput.fill(newName);
  });
  await test.step("Кнопка сохранения отображается", async () => {
    await expect(editProfilePage.saveButton).toBeVisible();
  });
  await test.step("Нажать кнопку сохранения", async () => {
    await editProfilePage.saveButton.click();
  });
  await test.step("На кнопке сохранения снова отображается текст 'Save Changes'", async () => {
    await expect(editProfilePage.saveButton).toContainText("Save Changes");
  });
  await test.step("Кнопка выхода отображается", async () => {
    await expect(editProfilePage.cancelButton).toBeVisible();
  });
  await test.step("Нажать на кнопку выхода из редактирования профиля", async () => {
    await editProfilePage.cancelButton.click();
  });
  await test.step("Имя пользователя отображается на странице", async () => {
    await expect(userPage.userName).toBeVisible();
  });
  await test.step("Имя пользователя изменено", async () => {
    await expect(userPage.userName).toContainText(newName);
  });
});

test("Попытка сохранить имя пользователя с пустым полем ввода", async ({
  editProfilePage,
}) => {
  await test.step("Поле ввода имени отображается на странице", async () => {
    await expect(editProfilePage.nameInput).toBeVisible();
  });
  await test.step("Очистить поле с именем от введенного значения", async () => {
    await editProfilePage.nameInput.clear();
  });
  await test.step("Поле ввода имени пусто", async () => {
    await expect(editProfilePage.nameInput).toBeEmpty();
  });
  await test.step("Кнопка сохранения изменений отображается на странице", async () => {
    await expect(editProfilePage.saveButton).toBeVisible();
  });
  await test.step("Нажать на кнопку сохранения изменений", async () => {
    await editProfilePage.saveButton.click();
  });
  await test.step("Ошибка отображается на странице", async () => {
    await expect(editProfilePage.nameRequiredMessage).toBeVisible();
  });
});
