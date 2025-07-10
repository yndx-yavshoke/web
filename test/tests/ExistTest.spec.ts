import { checkExists } from "./fixture/exist/ExistFixture";
import { checkNotExist } from "./fixture/exist/ExistFixture";
import { ExistPage } from '../tests/fixture/exist/ExistPage';
import test, { expect } from '@playwright/test';
import { authData } from './fixture/login/auth/setup/authData';
import { checkExistsData } from './fixture/exist/checkExistingData';


test.use({ storageState: { cookies: [], origins: [] } });

checkExists('Checks for existing user', async ({ page, checkExists }) => {

    await test.step('Initialize ExistPage object', async () => {
        const existPage = new ExistPage(page);

        await test.step('Filling email field with registered email', async () => {
            await existPage.emailInput.fill(authData.email);
        });

        await test.step('Waiting Check button to be available', async () => {
            await existPage.checkButton.waitFor();
        });

        await test.step('Checking for Check button has right placeholder', async () => {
            await expect(existPage.checkButton).toHaveText('Я в шоке?');
        });

        await test.step('Clicking on Check button', async () => {
            await existPage.checkButton.click();
        });

        await test.step('Waiting for title', async () => {
            await existPage.existsTitle.waitFor();
        });

        await test.step('Checking if right title is showed', async () => {
            await expect(existPage.existsTitle).toBeVisible();
        });
    });
});

checkNotExist('Checks for not existing user', async ({ page, checkNotExist }) => {

    await test.step('Initialize ExistPage object', async () => {
        const existPage = new ExistPage(page);

        await test.step('Filling email field with not registered email', async () => {
            await existPage.emailInput.fill(checkExistsData.notValidEmail);
        });

        await test.step('Waiting Check button to be available', async () => {
            await existPage.checkButton.waitFor();
        });

        await test.step('Checking for Check button has right placeholder', async () => {
            await expect(existPage.checkButton).toHaveText('Я в шоке?');
        });

        await test.step('Clicking on Check button', async () => {
            await existPage.checkButton.click();
        });

        await test.step('Waiting for title', async () => {
            await existPage.notExistTitle.waitFor();
        });

        await test.step('Checking if right title is showed', async () => {
            await expect(existPage.notExistTitle).toBeVisible();
        });
    });
});