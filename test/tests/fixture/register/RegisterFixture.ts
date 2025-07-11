import { RegisterPage } from '../register/RegisterPage';
import { test as base } from '@playwright/test';

type MyFixture = {
    registerUser: string;
}

export const test = base.extend<MyFixture>({

    registerUser: async ({ page }, use) => {

        await test.step('Initialize RegisterPage object', async () => {

            const registerPage = new RegisterPage(page);

            await test.step('Open register page', async () => {
                await page.goto("/register");
            });

            await test.step('Waiting for input field to become available', async () => {
                await registerPage.emailInput.waitFor();
            });

            await use('user registred')
        });
    }
})