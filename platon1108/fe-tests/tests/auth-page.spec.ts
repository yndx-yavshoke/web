import { expect } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { test } from "../fixtures/index";


test('Check visibility of all elements', async ({ loginPage }) => {
    await loginPage.open();

    await expect(loginPage.header).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.backButton).toBeVisible();
    await expect(loginPage.toRegisterButton).toBeVisible();
    await expect(loginPage.authErrorText).not.toBeVisible();
    await expect(loginPage.emptyEmailErrorText).not.toBeVisible();
    await expect(loginPage.emptyPasswordErrorText).not.toBeVisible();
});


test('Check successfull login of exist user', async ({ loginPage, profilePage, mainPage }) => {
    await loginPage.open();

    await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);
    await loginPage.page.waitForURL('/');

    await expect(profilePage.name).toBeVisible();
    await profilePage.logoutButton.click();
    await expect(mainPage.header).toBeVisible();
});


test('Check login of exist user with incorrect password', async ({ loginPage, profilePage, mainPage }) => {
    await loginPage.open();

    await loginPage.login(process.env.TEST_EMAIL!, faker.internet.password());

    await expect(loginPage.authErrorText).toBeVisible();
    await expect(loginPage.emptyEmailErrorText).not.toBeVisible();
    await expect(loginPage.emptyPasswordErrorText).not.toBeVisible();
});


test('Check login of non-exist user', async ({ loginPage, profilePage, mainPage }) => {
    await loginPage.open();

    await loginPage.login(faker.internet.email(), faker.internet.password());

    await expect(loginPage.authErrorText).toBeVisible();
    await expect(loginPage.emptyEmailErrorText).not.toBeVisible();
    await expect(loginPage.emptyPasswordErrorText).not.toBeVisible();
});


test('Check login with empty email and password', async ({ loginPage, profilePage, mainPage }) => {
    await loginPage.open();

    await loginPage.loginButton.click();

    await expect(loginPage.authErrorText).not.toBeVisible();
    await expect(loginPage.emptyEmailErrorText).toBeVisible();
    await expect(loginPage.emptyPasswordErrorText).toBeVisible();
});


test('Check login with empty email', async ({ loginPage, profilePage, mainPage }) => {
    await loginPage.open();

    await loginPage.login('', faker.internet.password());

    await expect(loginPage.authErrorText).not.toBeVisible();
    await expect(loginPage.emptyEmailErrorText).toBeVisible();
    await expect(loginPage.emptyPasswordErrorText).not.toBeVisible();
});


test('Check login with empty password', async ({ loginPage, profilePage, mainPage }) => {
    await loginPage.open();

    await loginPage.login(faker.internet.email(), '');

    await expect(loginPage.authErrorText).not.toBeVisible();
    await expect(loginPage.emptyEmailErrorText).not.toBeVisible();
    await expect(loginPage.emptyPasswordErrorText).toBeVisible();
});


test('Check redirect to register page', async ({ loginPage, registerPage }) => {
    await loginPage.open();

    await loginPage.toRegisterButton.click();

    await loginPage.page.waitForURL('/register');
    await expect(registerPage.header).toBeVisible();
});


test('Check redirect to main page', async ({ loginPage, mainPage }) => {
    await loginPage.open();

    await loginPage.backButton.click();

    await mainPage.page.waitForURL('/');
    await expect(mainPage.header).toBeVisible();
});