import { test as base, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

type MyFixture = {
    loginUser: string;
}

export const test = base.extend<MyFixture>({

    loginUser: async ({ page }, use) => {

        await test.step('Initialize LoginPage object', async () => {

            const loginPage = new LoginPage(page);

            await test.step('Open login page', async () => {
                await page.goto('/login');
            });

            await test.step('Waiting for email input field', async () => {
                await loginPage.inputEmail.waitFor();
            });

            await use('userLoggedIn');
        });
    }
});
