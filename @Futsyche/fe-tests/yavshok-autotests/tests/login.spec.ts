// tests/login.spec.ts
import { test, expect } from './fixtures/pages';
import { authUsers } from './fixtures/users';

test.describe('Авторизация', () => {
    test('Успешная авторизация молодого котика', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(authUsers.youngCat);
        await loginPage.shouldSeeProfile();
    });

    test('Успешная авторизация взрослого котика', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(authUsers.adultCat);
        await loginPage.shouldSeeProfile();
    });

    test('Успешная авторизация старого котика', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(authUsers.oldCat);
        await loginPage.shouldSeeProfile();
    });
});