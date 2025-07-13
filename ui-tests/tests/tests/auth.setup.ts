import setup from "@playwright/test";
import { test, expect } from "../../fixtures";

const userFile = "storage/.auth/user.json";

test("Авторизация пользователя", async ({ loginPage }) => {
  // Perform authentication steps. Replace these actions with your own.
  await loginPage.open();
  await loginPage.loginWithRegisteredUser();
  // Wait until the page receives the cookies.
  await loginPage.page.getByTestId("user-logout-button").toBeVisible;
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await loginPage.page.waitForURL("https://yavshok.ru/");

  // End of authentication steps.
  await loginPage.page.context().storageState({ path: userFile });
});
