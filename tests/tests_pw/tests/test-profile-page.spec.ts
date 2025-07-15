import { expect } from "@playwright/test";
import { test } from '../fixtures/index'
import * as dotenv from 'dotenv';

dotenv.config();

test.use({ storageState: 'tests/setup/.auth/user.json' });

test('Переход на страницу редактирования имени пользователя', async ({ profilePage }) => {
    await test.step('Открываем страницу профиля', async () => {
        await profilePage.open();
    });
    await test.step('Проверяем наличие аватара', async () => {
        await expect(profilePage.userAvatar).toBeVisible();
    });
    await test.step('Переходим на страницу редактирования имени пользователя', async () => {
        await profilePage.goToEditProfile();
    });
    await test.step('Проверяем, что кнопка редактировать профиль не отображается', async () => {
        await expect(profilePage.toEditProfileButton).not.toBeVisible();
    });
    await test.step('Проверяем, что открылась страница редактирования имени', async () => {
        await expect(profilePage.page).toHaveURL(/.*edit/);
    });
})

test('Выход пользователя из профиля', async ({ profilePage }) => {
    await test.step('Открываем страницу профиля', async () => {
        await profilePage.open();
    });
    await test.step('Проверяем наличие аватара', async () => {
        await expect(profilePage.userAvatar).toBeVisible();
    });
    await test.step('Выходим с профиля', async () => {
        await profilePage.logoutUser();
    });
    await test.step('Проверяем, что кнопка выйти из профиля не отображается', async () => {
        await expect(profilePage.toLogoutButton).not.toBeVisible();
    });
    await test.step('Проверяем, что открылась главная страница', async () => {
        await expect(profilePage.page).toHaveURL('/');
    });
})

test('После выхода из профиля поле email на главной странице пустое', async ({ page, mainPage, loginPage, profilePage }) => {
    const email = process.env.EMAIL!; 
    const password = process.env.PASSWORD!; 

    await test.step('Открываем страницу профиля', async () => {
        await profilePage.open()
    });
    await test.step('Проверяем наличие аватара', async () => {
        await expect(profilePage.userAvatar).toBeVisible();
    });
    await test.step('Выходим с профиля', async () => {
        await profilePage.logoutUser();
    });
    await test.step('Проверяем, что открылась главная страница', async () => {
        await expect(profilePage.page).toHaveURL('/');
    });
    await test.step('Проверяем, что email существует в системе', async () => {
        await mainPage.checkEmail(email, true);
    });
    await test.step('Нажимаем на кнопку логина', async () => {
        await mainPage.toLoginButton.click();
    });
    await test.step('Авторизируемся', async () => {
        await loginPage.login(email, password);
    });
    await test.step('Проверям, что кнопка выйти из профиля отображается', async () => {
        await expect(profilePage.page.getByTestId('user-logout-button').nth(1)).toBeVisible();
    });
    await test.step('Выходим с профиля', async () => {
        await profilePage.page.getByTestId('user-logout-button').nth(1).click();
    });
    await test.step('Проверяем, что открылась главная страница', async () => {
        await expect(profilePage.page).toHaveURL('/');
    });
    await test.step('Проверяем, что поле email отображается', async () => {
        await expect(mainPage.page.getByRole('textbox', { name: 'Введите email' })).toBeVisible();
    });
    await test.step('Проверяем, что поле email пустое', async () => {
        await expect(mainPage.page.getByRole('textbox', { name: 'Введите email' })).toHaveValue('');
    });
});

