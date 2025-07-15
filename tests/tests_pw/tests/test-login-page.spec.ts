import { expect } from "@playwright/test";
import { test } from '../fixtures/index'
import * as dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();

test('Авторизация зарегистрированного пользователя', async ({ loginPage }) => {
    const existEmail = process.env.EMAIL!; 
    const password = process.env.PASSWORD!; 

    await test.step('Открываем страницу логина', async () => {
        await loginPage.open();
    });

    await test.step('Проверяем заголовок', async () => {
        await expect(loginPage.title).toBeVisible();
    });

    await test.step('Авторизируем зарегистрированного пользователя', async () => {
        await loginPage.login(existEmail, password);
    });

    await test.step('Проверяем, что открылась страница профиля', async () => {
        await expect(loginPage.page).toHaveURL('/');
    });
});

test('Попытка авторизации с незарегистрированным пользователем', async ({ loginPage }) => {
    const notExistEmail = faker.internet.email();
    const password = faker.internet.password();

    await test.step('Открываем страницу логина', async () => {
        await loginPage.open();
    });

    await test.step('Проверяем заголовок', async () => {
        await expect(loginPage.title).toBeVisible();
    });

    await test.step('Авторизируем незарегистрированного пользователя', async () => {
        await loginPage.login(notExistEmail, password);
    });

    await test.step('Проверяем, что отобразилось сообщение об ошибке', async () => {
        await expect(loginPage.errorMessageNotExist).toBeVisible();
    });
});

test('Попытка авторизации с пустым полем пароля', async ({ loginPage }) => {
    const email = faker.internet.email();
    const password = '';

    await test.step('Открываем страницу логина', async () => {
        await loginPage.open();
    });

    await test.step('Проверяем заголовок', async () => {
        await expect(loginPage.title).toBeVisible();
    });

    await test.step('Авторизируем незарегистрированного пользователя', async () => {
        await loginPage.login(email, password);
    });

    await test.step('Проверяем, что отобразилось сообщение об ошибке', async () => {
        await expect(loginPage.errorMessageNotPassword).toBeVisible();
    });
});

test('Попытка авторизации с пустым полем email', async ({ loginPage }) => {
    const email = '';
    const password = faker.internet.password();

    await test.step('Открываем страницу логина', async () => {
        await loginPage.open();
    });

    await test.step('Проверяем заголовок', async () => {
        await expect(loginPage.title).toBeVisible();
    });

    await test.step('Авторизируем незарегистрированного пользователя', async () => {
        await loginPage.login(email, password);
    });

    await test.step('Проверяем, что отобразилось сообщение об ошибке', async () => {
        await expect(loginPage.errorMessageNotEmail).toBeVisible();
    });
});

test('Переход назад на главную страницу', async ({ loginPage }) => {
    await test.step('Открываем страницу логина', async () => {
        await loginPage.open();
    });

    await test.step('Проверяем заголовок', async () => {
        await expect(loginPage.title).toBeVisible();
    });
    
    await test.step('Переходим назад на главную страницу', async () => {
        await loginPage.goToBack();
    });

    await test.step('Проверяем, что открылась главная страница', async () => {
        await expect(loginPage.page).toHaveURL('/');
    });
});

test('Переход на страницу регистрации', async ({ loginPage }) => {
    await test.step('Открываем страницу логина', async () => {
        await loginPage.open();
    });

    await test.step('Проверяем заголовок', async () => {
        await expect(loginPage.title).toBeVisible();
    });
    
    await test.step('Переходим на страницу регистрации', async () => {
        await loginPage.goToRegister();
    });
    
    await test.step('Проверяем, что открылась страница регистрации', async () => {
        await expect(loginPage.page).toHaveURL(/.*register/);
    });
});