import { test, expect } from '@playwright/test';
import { ShokMainPage } from './fixtures/ShokMainPage';
import { UserExistingPage } from './fixtures/UserExistingPage';
import { faker } from '@faker-js/faker';

test.describe('Проверка существования пользователя', () => {
    let userExistingPage: UserExistingPage;
    let email: string;

    test.beforeEach(async ({ page }) => {
        await test.step('Открываем страницу', async () => {
            userExistingPage = new UserExistingPage(page);
            await userExistingPage.Open();
        });
    });

    test('Проверка UI-страницы существования пользователя', async ({ page }) => {
            await test.step('Проверяем поле ввода email', async () => {
            await userExistingPage.CheckInputEmail();
        });
        await test.step('Проверяем кнопку проверки', async () => {
            await userExistingPage.CheckCheckButton();
        });
        await test.step('Проверяем кнопку входа', async () => {
            await userExistingPage.CheckButtonLogin();
        });
    });

    test('Проверка существования незарегистрированного пользователя', async ({ page }) => {
        await test.step('Генерируем случайный email', async () => {
            email = faker.internet.email();
        });
        await test.step('Проверяем существование пользователя', async () => {
            await userExistingPage.CheckUserExisting(email, false);
        });
    });

    test('Проверка существования зарегистрированного пользователя', async ({ page }) => {
        await test.step('Вводим email зарегистрированного пользователя', async () => {
            email = 'user123@yandex.ru';
        });
        await test.step('Проверяем существование пользователя', async () => {
            await userExistingPage.CheckUserExisting(email, true);
        });
    });
});

test.describe('Проверка валидации e-mail', () => {
    let userExistingPage: UserExistingPage;
    let email: string;

    test.beforeEach(async ({ page }) => {
        await test.step('Открываем страницу', async () => {
            userExistingPage = new UserExistingPage(page);
            await userExistingPage.Open();
        });
    });

    test('Проверка ввода e-mail, не соответствующего маске', async ({ page }) => {
        await test.step('Вводим e-mail, не соответствующий маске', async () => {
            email = faker.internet.email().replace('@', '.');
        });
        await test.step('Проверяем валидацию e-mail', async () => {
            await userExistingPage.CheckEmailValidation(email, false);
        });
    });

    test('Проверка ввода e-mail с пробелом в начале и конце', async ({ page }) => {
        await test.step('Вводим e-mail с пробелом в начале и конце', async () => {
            email = ` ${faker.internet.email()} `;
        });
        await test.step('Проверяем валидацию e-mail', async () => {
            await userExistingPage.CheckEmailValidation(email, false);
        });
    });
});