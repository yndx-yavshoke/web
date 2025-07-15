import { test } from "../fixtures";
import * as allure from "allure-js-commons";

test.beforeEach(async ({ profilePage }) => {
    await allure.step('Открыть страницу профиля', async () => {
        await profilePage.open();
    });
});

test('logout from profile', async ({ profilePage, mainPage }) => {
    await allure.feature('Выход из системы');
    await allure.story('Успешный выход из профиля');

    await allure.step('Нажать кнопку выхода', async () => {
        await profilePage.logout();
    });

    await allure.step('Проверить отображение заголовка главной страницы', async () => {
        await mainPage.expectPageTitleVisible();
    });
});

test('open edit page from profile', async ({ profilePage, editPage }) => {
    await allure.feature('Редактирование профиля');
    await allure.story('Переход на страницу редактирования');

    await allure.step('Нажать кнопку редактирования профиля', async () => {
        await profilePage.openEditProfile();
    });

    await allure.step('Проверить видимость кнопки сохранения имени', async () => {
        await editPage.expectEditSaveButtonVisible();
    });
});

test('profile avatar is visible', async ({ profilePage }) => {
    await allure.feature('Аватар профиля');
    await allure.story('Отображение аватара');

    await allure.step('Проверить видимость аватара котика', async () => {
        await profilePage.expectCatAvatarVisible();
    });
})