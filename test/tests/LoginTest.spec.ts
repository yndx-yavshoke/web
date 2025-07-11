import { test } from "./fixture/login/LoginFixture";
import { expect } from "@playwright/test";
import { ProfilePage } from '../tests/fixture/ProfilePage';
import { LoginPage } from './fixture/login/LoginPage';
import { authData } from './fixture/login/auth/setup/authData.ts'

test.use({ storageState: { cookies: [], origins: [] } });

test('Checking successful user authorization', async ({ page, loginUser }) => {

    await test.step('Initialize ProfilePage and LoginPage objects', async () => {
        const profilePage = new ProfilePage(page);
        const loginPage = new LoginPage(page);

        await test.step('Checking Login page has right title', async () => {
            await expect(loginPage.title).toBeVisible();
        });

        await test.step('Checking Register button is avaliable', async () => {
            await expect(loginPage.registerButton).toBeVisible();
        });

        await test.step('Checking Login button is avaliable', async () => {
            await expect(loginPage.loginButton).toBeVisible();
        });

        await test.step('Filling email field with registered email', async () => {
            await loginPage.inputEmail.fill(authData.email);
        });

        await test.step('Filling password field with registered password', async () => {
            await loginPage.inputPassword.fill(authData.password);
        });

        await test.step('Clicking on login button', async () => {
            await loginPage.loginButton.click();
        });

        await test.step('Waiting for redirection', async () => {
            await page.waitForURL("https://yavshok.ru/");
        });

        await test.step('Save login data into file', async () => {
            await page.context().storageState({ path: 'tests/fixture/login/auth/setup/user.json' });
        });

        await test.step('Checking redirection to the profile page after successful authorization', async () => {
            await expect(profilePage.logoutButton).toBeVisible();
        });

        await test.step('Checking thar current page has correct URL', async () => {
            expect(page.url()).toBe('https://yavshok.ru/');
        });
    });
});