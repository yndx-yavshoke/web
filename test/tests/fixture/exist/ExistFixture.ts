import test, { test as base } from '@playwright/test';
import { ExistPage } from './ExistPage';

type MyFixture = {
    checkExists: string;
    checkNotExist: string;
}

export const checkExists = base.extend<MyFixture>({

    checkExists: async ({ page }, use) => {

        await test.step('Initialize ExistPage object', async () => {
            const existPage = new ExistPage(page);

            await test.step('Open start page', async () => {
                await page.goto('/')
            });

            await test.step('Waiting email input field to be available', async () => {
                await existPage.emailInput.waitFor();
            });

            await use('v shoke');
        });
    },
});

export const checkNotExist = base.extend<MyFixture>({

    checkNotExist: async ({ page }, use) => {

        await test.step('Initialize ExistPage object', async () => {
            const existPage = new ExistPage(page);

            await test.step('Open start page', async () => {
                await page.goto('/')
            });

            await test.step('Waiting email input field to be available', async () => {
                await existPage.emailInput.waitFor();
            });

            await use('ne v shoke');
        });
    }
});