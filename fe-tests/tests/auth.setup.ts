import { test as setup } from '@playwright/test';
import { LoginPage } from '../fixtures/LoginPage';
import path from 'path';
import * as allure from "allure-js-commons";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('auth', async ({ page }) => {
    await allure.epic('Аутентификация');
    await allure.feature('Настройка тестового окружения');
    await allure.story('Авторизация тестового пользователя');

    const loginPage = new LoginPage(page);

    await allure.step('Открыть страницу логина', async () => {
        await loginPage.open();
    });

    await allure.step('Ввести email и пароль', async () => {
        await loginPage.login('123456789@mail.ru', '123456');
    });

    await allure.step('Дождаться входа в аккаунт', async () => {
        await page.waitForURL('https://yavshok.ru/');
    });

    await allure.step('Сохранить состояние аутентификации', async () => {
        const authFile = 'playwright/.auth/user.json';
        await allure.parameter('Auth file path', authFile);
        await page.context().storageState({ path: authFile });
    });
});