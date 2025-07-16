import {expect} from '@playwright/test';
import {test} from '../Pages';
import {allure} from 'allure-playwright';

test.use({storageState: 'tests/auth/user1.json'})

test('Выход из профиля', async ({profilePage, page}) => {
    await allure.step('Открыть страницу профиля', async () => {
        await profilePage.open();
    });
    await allure.step('Нажать кнопку выхода из профиля', async () => {
        await profilePage.toLogoutButtonClick();
    });
    await allure.step('Проверить перенаправление на страницу проверки шоковости', async () => {
        await expect(page).toHaveURL('/');
    });
})

test('Редактирование профиля', async ({profilePage, page}) => {
    await allure.step('Открыть страницу профиля', async () => {
        await profilePage.open();
    });
    await allure.step('Нажать кнопку редактирования профиля', async () => {
        await profilePage.toEditProfileButtonClick();
    });
    await allure.step('Проверить переход на страницу редактирования', async () => {
        await expect(page.url()).toContain('/edit');
    });
})