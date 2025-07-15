import { test, expect } from "../../fixtures";
import { faker } from "@faker-js/faker";

test.beforeEach("Открыть страницу профиля и проверить видимость основных элементов", async ({ userProfilePage }) => {
  await test.step("Открыть страницу пользователя", async () => {
    await userProfilePage.open();
  });

  await test.step("Проверить, что аватар, имя, статус и кнопка выхода видимы", async () => {
    await expect(userProfilePage.userAvatar).toBeVisible();
    await expect(userProfilePage.userName).toBeVisible();
    await expect(userProfilePage.userStatus).toBeVisible();
    await expect(userProfilePage.logoutButton).toBeVisible();
  });
});

test("Пользователь может изменить имя", async ({ userProfilePage }) => {
  const newName = faker.person.firstName();

  await test.step("Нажать кнопку редактирования профиля", async () => {
    await userProfilePage.editProfileButton.click();
  });

  await test.step(`Ввести новое имя: ${newName}`, async () => {
    await userProfilePage.inputNewName.fill(newName);
  });

  await test.step("Сохранить изменения", async () => {
    await userProfilePage.saveButton.click();
    await expect(userProfilePage.saveButton).toHaveText("Save Changes");
  });

  await test.step("Вернуться на страницу аккаунта", async () => {
    await userProfilePage.cancelButton.click();
  });

  await test.step("Проверить, что имя изменилось на новое", async () => {
    await expect(userProfilePage.userName).toHaveText(newName);
  });
});

test("Имя не поменяется на базовое при отмене изменений", async ({ userProfilePage }) => {
  const oldName = await userProfilePage.userName.textContent();
  const newName = faker.person.firstName();

  await test.step("Нажать кнопку редактирования профиля", async () => {
    await userProfilePage.editProfileButton.click();
  });

  await test.step(`Ввести новое имя: ${newName}`, async () => {
    await userProfilePage.inputNewName.fill(newName);
  });

  await test.step("Проверить кнопку сохранения", async () => {
    await expect(userProfilePage.saveButton).toHaveText("Save Changes");
  });

  await test.step("Отменить редактирование", async () => {
    await userProfilePage.cancelButton.click();
  });

  await test.step("Проверить, что имя осталось прежним", async () => {
    await expect(userProfilePage.userName).toHaveText(oldName);
  });
});

test("logout выходит из аккаунта", async ({ userProfilePage }) => {
  await test.step("Выполнить logout", async () => {
    await userProfilePage.logout();
  });

  await test.step("Проверить, что вышло из аккаунта", async () => {
    await expect(userProfilePage.page.getByTestId("main-login-button")).toBeVisible();
  });
});

test("Статус старого котика отображается", async ({ userProfilePage }) => {
  await test.step("Мокировать возраст", async () => {
    await userProfilePage.mockAgeFlags();
  });

  await test.step("Мокировать пользователя с возрастом 80", async () => {
    await userProfilePage.mockUserAge(80);
  });

  await test.step("Перезайти в аккаунт", async () => {
    await userProfilePage.reEntry();
  });

  await test.step("Проверить статус пользователя", async () => {
    await expect(userProfilePage.userStatus).toHaveText("Ты старый котик");
  });
});

test.skip("Статус взрослого котика отображается", async ({ userProfilePage }) => {
  await test.step("Мокировать возраст", async () => {
    await userProfilePage.mockAgeFlags();
  });

  await test.step("Мокировать пользователя с возрастом 30", async () => {
    await userProfilePage.mockUserAge(30);
  });

  await test.step("Перезайти в аккаунт", async () => {
    await userProfilePage.reEntry();
  });

  await test.step("Проверить статус пользователя", async () => {
    await expect(userProfilePage.userStatus).toHaveText("Ты взрослый котик");
  });
});

test("Статус молодого котика отображается", async ({ userProfilePage }) => {
  await test.step("Мокировать возраст", async () => {
    await userProfilePage.mockAgeFlags();
  });

  await test.step("Мокировать пользователя с возрастом 10", async () => {
    await userProfilePage.mockUserAge(10);
  });

  await test.step("Перезайти в аккаунт", async () => {
    await userProfilePage.reEntry();
  });

  await test.step("Проверить статус пользователя", async () => {
    await expect(userProfilePage.userStatus).toHaveText("Ты молоденький котик");
  });
});