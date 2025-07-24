// tests/login.spec.ts
import { test, expect } from './fixtures/pages';
import { authUsers } from './fixtures/users';
import { allure } from 'allure-playwright';

test.describe('Авторизация', () => {
    test.beforeEach(() => {
        allure.epic('Система авторизации');
        allure.feature('Форма входа');
    });

    test('Успешная авторизация молодого котика', async ({ loginPage }) => {
        allure.story('Авторизация молодого пользователя');
        allure.severity('critical');
        allure.tag('smoke');

        await allure.step('Открытие страницы входа', async () => {
            await loginPage.goto();
        });

        await allure.step('Ввод учетных данных', async () => {
            await loginPage.login(authUsers.youngCat);
        });

        await allure.step('Проверка успешной авторизации', async () => {
            await loginPage.shouldSeeProfile();
        });
    });

    test('Успешная авторизация взрослого котика', async ({ loginPage }) => {
        allure.story('Авторизация взрослого пользователя');
        allure.severity('normal');

        await allure.step('Открытие страницы входа', async () => {
            await loginPage.goto();
        });

        await allure.step('Ввод учетных данных', async () => {
            await loginPage.login(authUsers.adultCat);
        });

        await allure.step('Проверка успешной авторизации', async () => {
            await loginPage.shouldSeeProfile();
        });
    });

    test('Успешная авторизация старого котика', async ({ loginPage }) => {
        allure.story('Авторизация пожилого пользователя');
        allure.severity('minor');

        await allure.step('Открытие страницы входа', async () => {
            await loginPage.goto();
        });

        await allure.step('Ввод учетных данных', async () => {
            await loginPage.login(authUsers.oldCat);
        });

        await allure.step('Проверка успешной авторизации', async () => {
            await loginPage.shouldSeeProfile();
        });
    });
});