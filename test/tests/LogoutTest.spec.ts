import { test } from "./fixture/logout/LogoutFixture"
import { expect } from "@playwright/test";
import { ProfilePage } from "../tests/fixture/ProfilePage";

test('Checking successful logout', async ({ page, logout }) => {

    await test.step('Initialize ProfilePage object', async () => {
        const profilePage = new ProfilePage(page);

        await test.step('Checking logout button is visible', async () => {
            await expect(profilePage.logoutButton).toBeVisible();
        });

        await test.step('Clicking on logout button', async () => {
            await profilePage.logoutButton.click();
        });

        await test.step('Checking redirection to the Start page after logout', async () => {
            await expect(page).toHaveURL('https://yavshok.ru/');
        });
    });
});
