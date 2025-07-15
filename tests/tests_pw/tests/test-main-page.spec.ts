import { expect } from "@playwright/test";
import { test } from '../fixtures/index'
import * as dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();

test('Проверка существующего email', async ({ mainPage }) => {
    const existEmail = process.env.EMAIL!; 

    await test.step('Открываем страницу', async () => {
        await mainPage.open();
    });

    await test.step('Проверяем заголовок', async () => {
        await expect(mainPage.title).toBeVisible();
    });

    await test.step('Проверяем, что email существует в системе', async () => {
        await mainPage.checkEmail(existEmail, true);
    });
});

test('Проверка несуществующего email', async ({ mainPage }) => {
    const notExisEmail = faker.internet.email();

    await test.step('Открываем страницу', async () => {
        await mainPage.open();
    });

    await test.step('Проверяем заголовок', async () => {
        await expect(mainPage.title).toBeVisible();
    });

    await test.step('Проверяем, что email не существует в системе', async () => {
        await mainPage.checkEmail(notExisEmail, false);
    });
});

test('Переход на страницу логина', async ({ mainPage }) => {
    await test.step('Открываем страницу', async () => {
        await mainPage.open();
    });

    await test.step('Проверяем заголовок', async () => {
        await expect(mainPage.title).toBeVisible();
    });
    
    await test.step('Переходим на страницу логина', async () => {
        await mainPage.goToLoginPage();
    });
    
    await test.step('Проверяем, что открылась страница входа', async () => {
        await expect(mainPage.page).toHaveURL(/.*login/);
    });
});