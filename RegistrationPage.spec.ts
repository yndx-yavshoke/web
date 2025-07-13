import { test } from '../../fixturies/index';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ registrationPage }) => {
    await registrationPage.open();
    await expect(registrationPage.emailInput).toBeVisible();
});



test('Unsuccessful register - invalid email format', async ({ registrationPage }) => {
    await registrationPage.register(
        'invalid-email',
        faker.internet.password({ length: 10 }),
        faker.number.int({ min: 0, max: 99 }).toString()
    );

    await expect(registrationPage.errors.email.invalid).toBeVisible();
});

test('Unsuccessful register - short password', async ({ registrationPage }) => {
    await registrationPage.register(
        faker.internet.email(),
        'short', // Пароль меньше 6 символов
        faker.number.int({ min: 0, max: 99 }).toString()
    );

    await expect(registrationPage.errors.password.tooShort).toBeVisible();
});

test('Unsuccessful register - empty fields', async ({ registrationPage }) => {
    // Проверяем, что поля пустые
    await expect(registrationPage.emailInput).toBeEmpty();
    await expect(registrationPage.passwordInput).toBeEmpty();
    await expect(registrationPage.ageInput).toBeEmpty();

    // Нажимаем кнопку регистрации без заполнения
    await registrationPage.registerButton.click();

    // Проверяем все ошибки
    await expect(registrationPage.errors.email.empty).toBeVisible();
    await expect(registrationPage.errors.password.empty).toBeVisible();
    await expect(registrationPage.errors.age.empty).toBeVisible();
});

test('Redirect to auth page', async ({ registrationPage, authPage }) => {
    await registrationPage.goBack();
    await expect(authPage.emailField).toBeVisible();
});
test('Unsuccessful register - invalid age', async ({ registrationPage }) => {
    await registrationPage.register(
        faker.internet.email(),
        faker.internet.password({ length: 10 }),
        'not-a-number' // Некорректный возраст
    );

    await expect(registrationPage.errors.age.notNumber).toBeVisible();
});



test('Unsuccessful register - email already exists', async ({ registrationPage }) => {
    const existingEmail = 'test@example.com'; // Заменить на реальный
    
    await registrationPage.register(
        existingEmail,
        faker.internet.password({ length: 10 }),
        faker.number.int({ min: 0, max: 99 }).toString()
    );

    await expect(registrationPage.errors.email.exists).toBeVisible();
});