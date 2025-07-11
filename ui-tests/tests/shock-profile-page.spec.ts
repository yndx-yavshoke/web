import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { getApiBaseUrl } from '../utils/env';
import { YOUNG_CAT_MOCK, NOT_CAT_MOCK, OLD_CAT_MOCK } from "../utils/constants";

test.use({ storageState: 'tests/setup/auth/user.json' })
test.describe('Проверка элементов профиля', () => {
    test('profile_page_should_contain', async ({ profilePage }) => {
        await test.step('Открыть страницу профиля', async () => {
            await profilePage.open();
        });
        await test.step('Проверить элементы профиля', async () => {
            await expect.soft(profilePage.avatar, 'Аватар должен быть видимым').toBeVisible();
            await expect.soft(profilePage.editProfileButton, 'Кнопка редактирования профиля должна быть видимой').toBeVisible();
            await expect.soft(profilePage.picture1, 'Первая картинка профиля должна быть видимой').toBeVisible();
            await expect.soft(profilePage.picture2, 'Вторая картинка профиля должна быть видимой').toBeVisible();
            await expect.soft(profilePage.picture3, 'Третья картинка профиля должна быть видимой').toBeVisible();
            await expect.soft(profilePage.picture4, 'Четвертая картинка профиля должна быть видимой').toBeVisible();
            await expect.soft(profilePage.logoutButton, 'Кнопка выхода должна быть видимой').toBeVisible();
        });
    });
});

test.describe('Проверка выхода из профиля', () => {
    test('profile_page_should_logout', async ({ profilePage }) => {
        await test.step('Открыть страницу профиля', async () => {
            await profilePage.open();
        });
        await test.step('Кликнуть по кнопке Logout', async () => {
            await expect(profilePage.logoutButton, 'Кнопка выхода должна быть видимой').toBeVisible();
            await profilePage.logoutButton.click();
            await expect(profilePage.page.getByText('Я в ШОКе', { exact: true })).toBeVisible();
        });
    });
});

test.describe('Проверка молодого котика', () => {
    test('profile_should_be_young', async ({ profilePage }) => {
        await test.step('Открыть страницу профиля', async () => {
            await profilePage.open();
        });
        await test.step('Замокать ответ /experiments для молодого котика', async () => {
            await profilePage.page.route(getApiBaseUrl() + '/experiments', (route) => {
                route.fulfill({
                    status: 200,
                    body: JSON.stringify(YOUNG_CAT_MOCK)
                })
            })
        });
        await test.step('Проверить сообщение о молодом котике', async () => {
            await expect(profilePage.page.getByText('Ты молоденький котик'), 'Должно появиться сообщение о молодом котике').toBeVisible();
        });
    });
});

test.describe('Проверка не котика', () => {
    test('profile_should_be_adult', async ({ profilePage }) => {
        await test.step('Открыть страницу профиля', async () => {
            await profilePage.open();
        });
        await test.step('Замокать ответ /experiments для не котика', async () => {
            await profilePage.page.route(getApiBaseUrl() + '/experiments', (route) => {
                route.fulfill({
                    status: 200,
                    body: JSON.stringify(NOT_CAT_MOCK)
                })
            })
        });
        await test.step('Проверить сообщение UwU', async () => {
            await expect(profilePage.page.getByText('UwU'), 'Должно появиться сообщение UwU').toBeVisible();
        });
    });
});

test.describe('Проверка старого котика', () => {
    test('profile_should_be_old', async ({ profilePage }) => {
        await test.step('Открыть страницу профиля', async () => {
            await profilePage.open();
        });
        await test.step('Замокать ответ /experiments для старого котика', async () => {
            await profilePage.page.route(getApiBaseUrl() + '/experiments', (route) => {
                route.fulfill({
                    status: 200,
                    body: JSON.stringify(OLD_CAT_MOCK)
                })
            })
        });
        await test.step('Проверить сообщение о старом котике', async () => {
            await expect(profilePage.page.getByText('Ты старый котик'), 'Должно появиться сообщение о старом котике').toBeVisible();
        });
    });
});