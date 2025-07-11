import { expect } from '@playwright/test';
import { test } from '../fixtures/index';


test.beforeEach(async ({ mainPage }) => {
    await mainPage.open();

    await expect(mainPage.title).toBeVisible();
});


test('Check existing user', async ({ mainPage }) => {
    const email = process.env.TEST_EMAIL;
    if (!email) {
        throw new Error('TEST_EMAIL is not defined');
    };

    await mainPage.checkEmail(email);

    await expect(mainPage.existingUserText).toBeVisible();
    await expect(mainPage.existingUserGif).toBeVisible();
});

test('Check non-existing user', async ({ mainPage }) => {
    const email = '1non_existing_dude@1yandex.ru';

    await mainPage.checkEmail(email);
    
    await expect(mainPage.nonExistingUserText).toBeVisible();
    await expect(mainPage.existingUserGif).not.toBeVisible();
});

test('Locking check-button when Email field is empty', async ({ mainPage }) => {
    await expect(mainPage.inputEmail).toBeEmpty();
    await expect(mainPage.inputEmailPlaceholder).toBeVisible();
    
    await mainPage.checkButton.click();

    await expect(mainPage.existingUserText).not.toBeVisible();
    await expect(mainPage.nonExistingUserText).not.toBeVisible();
});

test('Redirect to Login page', async ({ mainPage, loginPage }) => {
    await mainPage.toLoginButton.click();

    await expect(loginPage.title).toBeVisible();
});