import { test, expect } from '@playwright/test';
import { UserProfilePage } from './fixtures/UserProfilePage';
import adultCat from './constants/mocks/AdultCat.json';
import oldCat from './constants/mocks/OldCat.json';
import youngCat from './constants/mocks/youngCat.json';
import uwu from './constants/mocks/UwuCat.json';
import auth from './setup/auth.json';

test.use({ storageState: auth });

test.describe('Проверка статуса пользователя', () => {
    let profilePage: UserProfilePage;

    test('Проверка отображения статуса молодого котика', async ({ page }) => {
        page.route('https://api.yavshok.ru/experiments', (route, request) => {
            return route.fulfill({
                status: 200,
                body: JSON.stringify(youngCat)
            });
        });

        profilePage = new UserProfilePage(page);
        await test.step('Открываем страницу профиля', async () => {
            await profilePage.Open();
        });
        await test.step('Проверяем статус пользователя - "Ты молоденький котик"', async () => {
            await profilePage.CheckUserStatus();
            await profilePage.CheckYoungCat();
        });
    });

    test.skip('Проверка отображения статуса взрослого котика', async ({ page }) => {
        page.route('https://api.yavshok.ru/experiments', (route, request) => {
            return route.fulfill({
                status: 200,
                body: JSON.stringify(adultCat)
            });
        });

        profilePage = new UserProfilePage(page);
        await test.step('Открываем страницу профиля', async () => {
            await profilePage.Open();
        });
        await test.step('Проверяем статус пользователя - "Ты взрослый котик"', async () => {
            await profilePage.CheckUserStatus();
            await profilePage.CheckAdultCat();
        });
    });

    test('Проверка отображения статуса старого котика', async ({ page }) => {
        page.route('https://api.yavshok.ru/experiments', (route, request) => {
            return route.fulfill({
                status: 200,
                body: JSON.stringify(oldCat)
            });
        });

        profilePage = new UserProfilePage(page);
        await test.step('Открываем страницу профиля', async () => {
            await profilePage.Open();
        });
        await test.step('Проверяем статус пользователя - "Ты старый котик"', async () => {
            await profilePage.CheckUserStatus();
            await profilePage.CheckOldCat();
        });
    });

    test('Проверка отображения статуса UwU', async ({ page }) => {
        page.route('https://api.yavshok.ru/experiments', (route, request) => {
            return route.fulfill({
                status: 200,
                body: JSON.stringify(uwu)
            });
        });

        profilePage = new UserProfilePage(page);
        await test.step('Открываем страницу профиля', async () => {
            await profilePage.Open();
        });
        await test.step('Проверяем статус пользователя - "UwU"', async () => {
            await profilePage.CheckUserStatus();
            await profilePage.CheckUwU();
        });
    });
})