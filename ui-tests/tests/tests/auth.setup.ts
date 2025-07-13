import { test, expect } from "../../fixtures";
import * as path from "path";

const userFile = path.join("storage", ".auth", "user.json");

test("Авторизация пользователя", async ({ loginPage }) => {
  await test.step("Открываем страницу логина", async () => {
    await loginPage.open();
  });

  await test.step("Выполняем вход с зарегистрированным пользователем", async () => {
    await loginPage.loginWithRegisteredUser();
  });

  await test.step("Ждём появления кнопки выхода (проверка успешного входа)", async () => {
    await expect(loginPage.page.getByTestId("user-logout-button")).toBeVisible();
  });

  await test.step("Ждём переход на главную страницу", async () => {
    await loginPage.page.waitForURL("https://yavshok.ru/");
  });

  await test.step("Сохраняем состояние в файл", async () => {
    await loginPage.page.context().storageState({ path: userFile });
  });
});
