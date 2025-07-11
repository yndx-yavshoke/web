import { expect } from "@playwright/test";
import { test } from "../../fixtures/index";


test ('login', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('login-email-input').fill('test0@yandex.ru');
    await page.getByTestId('login-password-input').fill('123456');

    await page.getByTestId('login-submit-button').click();

    await expect(page.getByTestId('user-logout-button')).toBeVisible();

    await page.context().storageState({path: './tests/setup/.auth/user.json'});
} )