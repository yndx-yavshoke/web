import { test } from './fixtures/ShokFixtures';
import adultCat from './constants/mocks/AdultCat.json';
import oldCat from './constants/mocks/OldCat.json';
import youngCat from './constants/mocks/youngCat.json';
import uwu from './constants/mocks/UwuCat.json';
import auth from './setup/auth.json';

test.use({ storageState: auth });

test.describe('Проверка статуса пользователя', () => {
    
    test('Проверка отображения статуса молодого котика', async ({ page, userProfilePage }) => {
        page.route('https://api.yavshok.ru/experiments', (route, request) => {
            return route.fulfill({
                status: 200,
                body: JSON.stringify(youngCat)
            });
        });

        await test.step('Открываем страницу профиля', async () => {
            await userProfilePage.Open();
        });
        await test.step('Проверяем статус пользователя - "Ты молоденький котик"', async () => {
            await userProfilePage.CheckUserStatus();
            await userProfilePage.CheckYoungCat();
        });
    });

    test.skip('Проверка отображения статуса взрослого котика', async ({ page, userProfilePage }) => {
        page.route('https://api.yavshok.ru/experiments', (route, request) => {return route.fulfill({
            status: 200,
            body: JSON.stringify(adultCat)
        });
    });

    await test.step('Открываем страницу профиля', async () => {
        await userProfilePage.Open();
    });
    await test.step('Проверяем статус пользователя - "Ты взрослый котик"', async () => {
        await userProfilePage.CheckUserStatus();
        await userProfilePage.CheckAdultCat();
    });
});

test('Проверка отображения статуса старого котика', async ({ page, userProfilePage }) => {
    page.route('https://api.yavshok.ru/experiments', (route, request) => {
        return route.fulfill({
            status: 200,
            body: JSON.stringify(oldCat)
        });
    });

    await test.step('Открываем страницу профиля', async () => {
        await userProfilePage.Open();
    });
    await test.step('Проверяем статус пользователя - "Ты старый котик"', async () => {
        await userProfilePage.CheckUserStatus();
        await userProfilePage.CheckOldCat();
    });
});

test('Проверка отображения статуса UwU', async ({ page, userProfilePage }) => {
    page.route('https://api.yavshok.ru/experiments', (route, request) => {
        return route.fulfill({
            status: 200,
            body: JSON.stringify(uwu)
        });
    });

    await test.step('Открываем страницу профиля', async () => {
        await userProfilePage.Open();
    });
    await test.step('Проверяем статус пользователя - "UwU"', async () => {
        await userProfilePage.CheckUserStatus();
        await userProfilePage.CheckUwU();
    });
});
})