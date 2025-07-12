import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { allure } from 'allure-playwright';

test.use({ storageState: 'tests/setup/auth.json' })

test('Выход из профиля', async ({ profilePage, page }) => {
    await allure.step('Открыть страницу профиля', async () => {
        await profilePage.open();
    });
    await allure.step('Нажать кнопку выхода из профиля', async () => {
        await profilePage.clickLogoutButton();
    });
    await allure.step('Проверить перенаправление на страницу проверки шоковости', async () => {
        await expect(page).toHaveURL('/');
    });
})

test('Редактирование профиля', async ({ profilePage, page }) => {
    await allure.step('Открыть страницу профиля', async () => {
        await profilePage.open();
    });
    await allure.step('Нажать кнопку редактирования профиля', async () => {
        await profilePage.clickEditProfileButton();
    });
    await allure.step('Проверить переход на страницу редактирования', async () => {
        await expect(page.url()).toContain('/edit');
    });
})
