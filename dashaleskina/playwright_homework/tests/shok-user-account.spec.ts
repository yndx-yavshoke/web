import { expect } from "@playwright/test";
import { test } from "../fixtures/index";

test.use({ storageState: "tests/setup/.auth/user.json" });

test.describe("Profile age status validation", () => {
  const mockForOld = {
    flags: {
      age: {
        enabled: true,
        young: {
          from: 0,
          to: 21,
        },
        adult: {
          from: 22,
          to: 68,
        },
        old: {
          from: 69,
          to: 99,
        },
        oldFrom: 0,
      },
    },
  };

  const mockForYoung = {
    flags: {
      age: {
        enabled: true,
        young: {
          from: 0,
          to: 21,
        },
        adult: {
          from: 22,
          to: 68,
        },
        old: {
          from: 69,
          to: 99,
        },
        youngFrom: 0,
      },
    },
  };

  const mockForAdult = {
    flags: {
      age: {
        enabled: true,
        young: {
          from: 0,
          to: 21,
        },
        adult: {
          from: 22,
          to: 68,
        },
        old: {
          from: 69,
          to: 99,
        },
        youngFrom: 0,
      },
    },
  };

  test("Check 'old' status", async ({ page, userPage, loginPage }) => {
    await page.goto("/");
    await page.route("https://api.yavshok.ru/experiments", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(mockForOld),
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
        body: JSON.stringify(mockForYoung),
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
        body: JSON.stringify(mockForAdult),
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
