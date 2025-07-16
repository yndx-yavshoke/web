import { expect } from '@playwright/test';

import { test } from '@common/test';

test.describe('Страница авторизации', () => {
    test.beforeEach(async ({ loginPage }) => {
        await test.step('Открыть страницу https://yavshok.ru/login', async () => {
            await loginPage.open();
        });
    });

    test('Проверить кнопку «Регистрация»', async ({ loginPage, registerPage }) => {
        await expect(loginPage.model.registerButton).toBeVisible();

        await loginPage.model.registerButton.click();

        await expect(registerPage.model.title).toBeVisible();
    });

    test('Проверить кнопку «Назад»', async ({ loginPage, mainPage }) => {
        await expect(loginPage.model.backButton).toBeVisible();

        await loginPage.model.backButton.click();

        await expect(mainPage.model.title).toBeVisible();
    });
});
