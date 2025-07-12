import { expect } from "@playwright/test";
import { test } from "../fixtures/index";
import { MOCK_FOR_OLD, MOCK_FOR_YOUNG, MOCK_FOR_ADULT } from "../mock/ageMocks";

test.use({ storageState: "tests/setup/.auth/user.json" });

test.describe("Profile age status validation", () => {
  test("Check 'old' status", async ({ page, userPage, loginPage }) => {
    await page.goto("/");
    await page.route("https://api.yavshok.ru/experiments", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(MOCK_FOR_OLD),
      });
    });
    await expect(loginPage.emailInput).not.toBeVisible();
    await expect(userPage.userStatusOld).toBeVisible();
  });

  test("Check 'young' status", async ({ page, userPage, loginPage }) => {
    await page.goto("/");
    await page.route("https://api.yavshok.ru/experiments", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(MOCK_FOR_YOUNG),
      });
    });
    await expect(loginPage.emailInput).not.toBeVisible();
    await expect(userPage.userStatusYoung).toBeVisible();
  });

  test.skip("Check 'adult' status", async ({ page, userPage, loginPage }) => {
    await page.goto("/");
    await page.route("https://api.yavshok.ru/experiments", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(MOCK_FOR_ADULT),
      });
    });
    await expect(loginPage.emailInput).not.toBeVisible();
    await expect(userPage.userStatusAdult).toBeVisible();
  });
});

test("'Edit profile' button check", async ({ userPage, editProfilePage }) => {
  await userPage.open();
  await userPage.editProfileButton.click();
  await expect(editProfilePage.title).toBeVisible();
});

test("'Logout' button check", async ({ userPage, mainPage }) => {
  await userPage.open();
  await userPage.logoutButton.click();
  await expect(userPage.logoutButton).not.toBeVisible();
  await expect(mainPage.title).toBeVisible();
});
