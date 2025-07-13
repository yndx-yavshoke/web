import { expect, test } from "@playwright/test";


test("login", async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("login-email-input").fill("test@mail.ru")
    await page.getByTestId("login-password-input").fill("111111")
    await page.getByTestId("login-submit-button").click()
    await expect(page).toHaveURL("/")
    await page.context().storageState({path: './tests/state/user.json'});
})