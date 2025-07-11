import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { faker } from '@faker-js/faker';


test.beforeEach(async ({ registerPage }) => {
    await registerPage.open();
    
    await expect(registerPage.title).toBeVisible();
});


// Успешная регистрация в оковах комментариев, дабы БД продакшна не кошмарить
/*
test('Successful register', async ({ registerPage, userProfilePage }) => {
    const email = faker.internet.email();
    const password = faker.internet.password({length: 10});
    const age = faker.number.int({min: 0, max: 99}).toString();
    
    await registerPage.register(email, password, age);

    await expect(userProfilePage.logoutButton).toBeVisible();
});
*/

test('Unsuccessful register (incorrect email format)', async ({ registerPage }) => {
    const email = 'bad_email';
    const password = faker.internet.password({length: 10});
    const age = faker.number.int({min: 0, max: 99}).toString();

    await registerPage.register(email, password, age);

    await expect(registerPage.warningIncorrectEmail).toBeVisible();
});

test('Unsuccessful register (password less than 6 symbols)', async ({ registerPage }) => {
    const email = faker.internet.email();
    const password = faker.internet.password({length: 5});
    const age = faker.number.int({min: 0, max: 99}).toString();

    await registerPage.register(email, password, age);

    await expect(registerPage.warningPasswordTooShort).toBeVisible();
});

test('Unsuccessful register (empty fields)', async ({ registerPage }) => {
    await expect(registerPage.inputEmail).toBeEmpty();
    await expect(registerPage.inputEmailPlaceholder).toBeVisible();
    await expect(registerPage.inputPassword).toBeEmpty();
    await expect(registerPage.inputPasswordPlaceholder).toBeVisible();
    await expect(registerPage.inputAge).toBeEmpty();
    await expect(registerPage.inputAgePlaceholder).toBeVisible();

    await registerPage.registerButton.click();

    await expect(registerPage.warningEmptyEmail).toBeVisible();
    await expect(registerPage.warningEmptyPassword).toBeVisible();
    await expect(registerPage.warningEmptyAge).toBeVisible();
});

test('Redirect back to Login page', async ({ registerPage, loginPage }) => {
    await registerPage.backToLoginButton.click();

    await expect(loginPage.title).toBeVisible();
});