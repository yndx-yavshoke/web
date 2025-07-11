import { test as base } from '@playwright/test'
import { ProfilePage } from "../ProfilePage";
import { expect } from '@playwright/test';

type MyFixture = {
    logout: string;
}

export const test = base.extend<MyFixture>({

    logout: async ({ page }, use) => {

        await test.step('Initialize ProfilePage object', async () => {
            const profilePage = new ProfilePage(page);

            await test.step('Open profile page', async () => {
                await page.goto("https://yavshok.ru/");
            });

            await test.step('Waiting logout button to be available', async () => {
                await profilePage.logoutButton.waitFor();
            });

            await use('userLoggedOut');
        });
    }
});
