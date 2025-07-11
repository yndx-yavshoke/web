import { expect, TestInfo } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { test } from "../fixtures/index";

test.use({ storageState: "tests/setup/.auth/user_creds.json" });

test.describe('Tests with changed name', () => {
    test.describe.configure({ mode: 'serial' }); // Turning off parallel execution to prevent several renaming at the same time

    test.afterEach('Revert changed name', async ({ page, request }, testInfo) => {
        const baseURL = testInfo.config.webServer?.url || testInfo.config.projects[0].use.baseURL;
        const tokenOrigin = (await page.context().storageState()).origins.find(c => c.origin === baseURL)
        expect(tokenOrigin).toBeDefined();
        const authTokenItem = tokenOrigin?.localStorage?.find(item => item.name === 'AuthToken');
        const authToken = authTokenItem?.value;
        expect(authToken).toBeTruthy();

        const response = await request.patch(baseURL!.replace('://', '://api.') + '/user/name', {
            headers: {
                'Authorization': 'Bearer ' + authToken,
            },
            data: {
                'name': process.env.TEST_NAME!,
            }
        });
        expect(response.status()).toBe(200);
    });


    test('Check rename user', async ({ editProfilePage, profilePage }) => {
        const name = faker.internet.username();

        await editProfilePage.open();
        await editProfilePage.renameUser(name);

        // await editProfilePage.page.waitForURL('/');
        await profilePage.open(); // Redirect does not work, open page manually

        const newName = await profilePage.name.textContent();
        await expect(newName).toEqual(name);
    });


    test('Check special UFT-8 symbols', async ({ editProfilePage, profilePage }) => {
        const name = 'ИмяName你好！こんにちは！안녕하세요! ✨𝄞😊\∑∫√∞€£¥₹→⇨↻☯⚡♞⚛👍🚀🌍'

        await editProfilePage.open();
        await editProfilePage.renameUser(name);

        // await editProfilePage.page.waitForURL('/');
        await profilePage.open(); // Redirect does not work, open page manually

        const newName = await profilePage.name.textContent();
        await expect(newName).toEqual(name);
    });
});


test('Check visibility of all elements', async ({ editProfilePage }) => {
    await editProfilePage.open();

    await expect(editProfilePage.header).toBeVisible();
    await expect(editProfilePage.fieldName).toBeVisible();
    await expect(editProfilePage.input).toBeVisible();
    await expect(editProfilePage.saveButton).toBeVisible();
    await expect(editProfilePage.cancelButton).toBeVisible();
    await expect(editProfilePage.errorText).not.toBeVisible();
});

test('Check saving changings with empty name', async ({ editProfilePage }) => {
    await editProfilePage.open();
    await editProfilePage.saveButton.click();
    await expect(editProfilePage.errorText).toBeVisible();
});


test('Check cancellation with empty name', async ({ editProfilePage, profilePage }) => {
    await editProfilePage.open();

    await editProfilePage.cancelButton.click();

    await editProfilePage.page.waitForURL('/');
    const name = await profilePage.name.textContent();
    await expect(name).toEqual(process.env.TEST_NAME!);
});


test('Check cancellation with non-empty name', async ({ editProfilePage, profilePage }) => {
    await editProfilePage.open();
    
    await editProfilePage.input.fill(faker.internet.username());
    await editProfilePage.cancelButton.click();

    await editProfilePage.page.waitForURL('/');
    const name = await profilePage.name.textContent();
    await expect(name).toEqual(process.env.TEST_NAME!);
});