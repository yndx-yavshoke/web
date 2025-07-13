import { expect } from '@playwright/test';
import { test } from '../fixtures';

test.describe('Страница авторизации', () => {
    test.beforeEach(async ({ loginPage }) => {
        await test.step('Открыть страницу https://yavshok.ru/login', async () => {
            await loginPage.open();
        })
    });

    test('Проверить кнопку «Регистрация»', async ({ loginPage }) => {
        await expect(loginPage.registrationButton).toBeVisible();
        await loginPage.registrationButton.click();

        await expect(loginPage.page.getByText('Регистрация в ШОКе', { exact: true })).toBeVisible();
    });

    test('Проверить кнопку «Назад»', async ({ loginPage }) => {
        await expect(loginPage.backButton).toBeVisible();
        await loginPage.backButton.click();

        await expect(loginPage.page.getByText('Я в ШОКе', { exact: true })).toBeVisible();
    });

})

test.describe('Авторизация пользователя', () => {
    test.use({ storageState: 'tests/setup/.auth/user.json' });

    test('Проверить авторизацию', async ({ page }) => {
        await page.goto('/');

        await expect(page.getByTestId('user-logout-button')).toBeVisible();
    });
})