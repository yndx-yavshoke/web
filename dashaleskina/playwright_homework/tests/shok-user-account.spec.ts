import { expect } from "@playwright/test";
import { test } from "../fixtures/index";
import { MOCK_FOR_OLD, MOCK_FOR_YOUNG, MOCK_FOR_ADULT } from "../mock/ageMocks";

test.use({ storageState: "tests/setup/.auth/user.json" });

test.describe("Проверка статуса возраста пользователя", () => {
  test("Проверка статуса 'старый'", async ({ page, userPage, loginPage }) => {
    await test.step("Открыть главную страницу", async () => {
      await page.goto("/");
    });
    await test.step("Подменить ответ /experiments для статуса 'старый'", async () => {
      await page.route("https://api.yavshok.ru/experiments", (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify(MOCK_FOR_OLD),
        });
      });
    });
    await test.step("Поле email на странице входа не отображается", async () => {
      await expect(loginPage.emailInput).not.toBeVisible();
    });
    await test.step("Статус пользователя 'старый' отображается", async () => {
      await expect(userPage.userStatus.filter({ hasText: "старый" })).toBeVisible();
    });
  });

  test("Проверка статуса 'молоденький'", async ({ page, userPage, loginPage }) => {
    await test.step("Открыть главную страницу", async () => {
      await page.goto("/");
    });
    await test.step("Подменить ответ /experiments для статуса 'молоденький'", async () => {
      await page.route("https://api.yavshok.ru/experiments", (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify(MOCK_FOR_YOUNG),
        });
      });
    });
    await test.step("Поле email не отображается", async () => {
      await expect(loginPage.emailInput).not.toBeVisible();
    });
    await test.step("Статус пользователя 'молоденький' отображается", async () => {
      await expect(userPage.userStatus.filter({ hasText: "молоденький" })).toBeVisible();
    });
  });

  test.skip("Проверка статуса 'взрослый'", async ({ page, userPage, loginPage }) => {
    await test.step("Открыть главную страницу", async () => {
      await page.goto("/");
    });
    await test.step("Подменить ответ /experiments для статуса 'взрослый'", async () => {
      await page.route("https://api.yavshok.ru/experiments", (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify(MOCK_FOR_ADULT),
        });
      });
    });
    await test.step("Поле email не отображается", async () => {
      await expect(loginPage.emailInput).not.toBeVisible();
    });
    await test.step("Статус пользователя 'взрослый' отображается", async () => {
      await expect(userPage.userStatus.filter({ hasText: "взрослый" })).toBeVisible();
    });
  });
});

test("Проверка кнопки 'Редактировать профиль'", async ({ userPage, editProfilePage }) => {
  await test.step("Открыть страницу пользователя", async () => {
    await userPage.open();
  });
  await test.step("Кнопка 'Редактировать профиль' отображается", async () => {
    await expect(userPage.editProfileButton).toBeVisible();
  });
  await test.step("Нажать на кнопку 'Редактировать профиль'", async () => {
    await userPage.editProfileButton.click();
  });
  await test.step("Заголовок страницы редактирования профиля отображается", async () => {
    await expect(editProfilePage.title).toBeVisible();
  });
});

test("Проверка кнопки 'Выйти'", async ({ userPage, mainPage }) => {
  await test.step("Открыть страницу пользователя", async () => {
    await userPage.open();
  });
  await test.step("Кнопка 'Выйти' отображается", async () => {
    await expect(userPage.logoutButton).toBeVisible();
  });
  await test.step("Нажать на кнопку 'Выйти'", async () => {
    await userPage.logoutButton.click();
  });
  await test.step("Кнопка 'Выйти' не отображается", async () => {
    await expect(userPage.logoutButton).not.toBeVisible();
  });
  await test.step("Заголовок главной страницы отображается", async () => {
    await expect(mainPage.title).toBeVisible();
  });
});
