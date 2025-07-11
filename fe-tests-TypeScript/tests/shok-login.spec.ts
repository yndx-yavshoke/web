import { expect } from '@playwright/test';
import { test } from '../fixtures/index';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();

    await expect(loginPage.title).toBeVisible();
});


test('Successful login', async ({ loginPage, userProfilePage }) => {
    const email = process.env.TEST_EMAIL;
    if (!email) {
        throw new Error('TEST_EMAIL is not defined');
    };
    
    const password = process.env.TEST_PASSWORD;
    if (!password) {
        throw new Error('TEST_PASSWORD is not defined');
    };
    
    await loginPage.login(email, password);

    await expect(userProfilePage.logoutButton).toBeVisible();
});

test('Unsuccessful login (incorrect user email)', async ({ page, loginPage }) => {
    const email = '1_non_existing_dude@1yandex.ru';
    
    const password = process.env.TEST_PASSWORD;
    if (!password) {
        throw new Error('TEST_PASSWORD is not defined');
    };

    await loginPage.login(email, password);

    await expect(loginPage.warningIncorrectCredentials).toBeVisible();
});

test('Unsuccessful login (incorrect user password)', async ({ loginPage }) => {
    const email = process.env.TEST_EMAIL;
    if (!email) {
        throw new Error('TEST_EMAIL is not defined');
    };

    const password = '2043bad_1password4925';
    
    await loginPage.login(email, password);

    await expect(loginPage.warningIncorrectCredentials).toBeVisible();
});

test('Unsuccessful login (empty fields)', async ({ loginPage }) => {
    await expect(loginPage.inputEmail).toBeEmpty();
    await expect(loginPage.inputEmailPlaceholder).toBeVisible();
    await expect(loginPage.inputPassword).toBeEmpty();
    await expect(loginPage.inputPasswordPlaceholder).toBeVisible();

    await loginPage.loginButton.click();

    await expect(loginPage.warningEmptyEmail).toBeVisible();
    await expect(loginPage.warningEmptyPassword).toBeVisible();
});

test('Redirect to Register page', async ({ loginPage, registerPage }) => {
    await loginPage.toRegisterButton.click();

    await expect(registerPage.title).toBeVisible();
});

test('Redirect back to Main page', async ({ loginPage, mainPage }) => {
    await loginPage.backToMainButton.click();

    await expect(mainPage.title).toBeVisible();
});