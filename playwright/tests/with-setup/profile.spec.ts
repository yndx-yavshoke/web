import { expect } from '@playwright/test';

import { test } from '@common/test';
import { AUTH_PATH_STORAGE } from '@common/constants';

import { youngMock, oldMock } from '../mocks/experiments';

test.describe('Страница профиля', () => {
    test.use({ storageState: AUTH_PATH_STORAGE });

    test.beforeEach(async ({ profilePage }) => {
        await test.step('Открыть страницу https://yavshok.ru/', async () => {
            await profilePage.open();
        });
    });

    test('Проверка статуса «Ты молоденький котик»', async ({ page, profilePage }) => {
        await test.step('Замокать ответ ручки experiments youngFrom [наш возраст]', async () => {
            await page.route('https://api.yavshok.ru/experiments', (route) => {
                route.fulfill({
                    status: 200,
                    body: JSON.stringify(youngMock),
                });
            });
        });

        await test.step('Проверить статус при возрасте youngFrom', async () => {
            await expect(profilePage.model.statusYoungCat).toBeVisible();
        });
    });

    test('Проверка статуса «Ты старый котик»', async ({ page, profilePage }) => {
        await test.step('Замокать ответ ручки experiments oldFrom [наш возраст]', async () => {
            await page.route('https://api.yavshok.ru/experiments', (route) => {
                route.fulfill({
                    status: 200,
                    body: JSON.stringify(oldMock),
                });
            });
        });

        await test.step('Проверить статус при возрасте oldFrom', async () => {
            await expect(profilePage.model.statusOldCat).toBeVisible();
        });
    });

    test('Выход из аккаунта', async ({ profilePage, mainPage }) => {
        await test.step('Нажать кнопку «Выход из аккаунта»', async () => {
            await expect(profilePage.model.logoutButton).toBeVisible();
            await profilePage.model.logoutButton.click();
        });

        await test.step('Проверить переход на главную страницу незалогина', async () => {
            await expect(mainPage.model.title).toBeVisible();
        });
    });
})