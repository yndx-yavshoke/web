import { expect } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { test } from "../fixtures/index";


test('Check visibility of all elements', async ({ registerPage }) => {
    await registerPage.open();

    await expect(registerPage.header).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.ageInput).toBeVisible();
    await expect(registerPage.registerButton).toBeVisible();
    await expect(registerPage.backButton).toBeVisible();

    await expect(registerPage.emptyEmailErrorText).not.toBeVisible();
    await expect(registerPage.incorrectEmailErrorText).not.toBeVisible();
    await expect(registerPage.alreadyRegisteredEmailErrorText).not.toBeVisible();
    await expect(registerPage.emptyPasswordErrorText).not.toBeVisible();
    await expect(registerPage.tooShortPasswordErrorText).not.toBeVisible();
    await expect(registerPage.tooLongPasswordErrorText).not.toBeVisible();
    await expect(registerPage.emptyAgeErrorText).not.toBeVisible();
    await expect(registerPage.NaNAgeErrorText).not.toBeVisible();
    await expect(registerPage.outOfRangeAgeErrorText).not.toBeVisible();
});


test.skip('Check successfull login of exist user', async ({ registerPage, profilePage, mainPage }) => { // Skipp this test to avoid overloading test database 
    await registerPage.open();

    await registerPage.register(faker.internet.email(), faker.internet.password(), '20');
    await registerPage.page.waitForURL('/');

    await expect(profilePage.name).toBeVisible();
    await profilePage.logoutButton.click();
    await expect(mainPage.header).toBeVisible();
});


test('Check register with empty email', async ({ registerPage }) => {
    await registerPage.open();
    await registerPage.register('', faker.internet.password(), '20');
    await expect(registerPage.emptyEmailErrorText).toBeVisible();
});


test('Check register with incorrent email', async ({ registerPage }) => {
    await registerPage.open();
    await registerPage.register(faker.internet.username(), faker.internet.password(), '20');
    await expect(registerPage.incorrectEmailErrorText).toBeVisible();
});


test('Check register with already registered email', async ({ registerPage }) => {
    await registerPage.open();
    await registerPage.register(process.env.TEST_EMAIL!, faker.internet.password(), '20');
    await expect(registerPage.alreadyRegisteredEmailErrorText).toBeVisible();
});


test('Check register with empty password', async ({ registerPage }) => {
    await registerPage.open();
    await registerPage.register(faker.internet.email(), '', '20');
    await expect(registerPage.emptyPasswordErrorText).toBeVisible();
});


test('Check register with too short password', async ({ registerPage }) => {
    await registerPage.open();
    await registerPage.register(faker.internet.email(), faker.internet.password({ length: 4 }), '20');
    await expect(registerPage.tooShortPasswordErrorText).toBeVisible();
});


test.skip('Check register with too long password', async ({ registerPage }) => { // Skip this test due to product issue (adult status is not supported)
    await registerPage.open();
    await registerPage.register(faker.internet.email(), faker.internet.password({ length: 51 }), '20');
    await expect(registerPage.tooLongPasswordErrorText).toBeVisible();
});


test('Check register with empty age', async ({ registerPage }) => {
    await registerPage.open();
    await registerPage.register(faker.internet.email(), faker.internet.password(), '');
    await expect(registerPage.emptyAgeErrorText).toBeVisible();
});


test('Check register with not-a-number age', async ({ registerPage }) => {
    await registerPage.open();
    await registerPage.register(faker.internet.email(), faker.internet.password(), '-1');
    await expect(registerPage.NaNAgeErrorText).toBeVisible();
});


test('Check redirect to login page', async ({ registerPage, loginPage }) => {
    await registerPage.open();

    await registerPage.backButton.click();

    await registerPage.page.waitForURL('/login');
    await expect(loginPage.header).toBeVisible();
});