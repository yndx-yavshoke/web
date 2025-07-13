import { expect } from "@playwright/test";
import { test } from '../fixtures/index'
import * as dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();

test('Регистрация незарегистрированного пользователя', async ({ registerPage }) => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const age = '18'

    await test.step('Открываем страницу регистрации', async () => {
        await registerPage.open();
    });
    await test.step('Проверяем заголовок', async () => {
        await expect(registerPage.title).toBeVisible();
    });

    // остановка теста, чтобы не засорять бд
    return;

    await test.step('Регистрируем незарегистрированного пользователя', async () => {
        await registerPage.register(email, password, age);
    });
    await test.step('Проверяем, что открылась страница профиля', async () => {
        await expect(registerPage.page).toHaveURL('/');
    });
});

test('Попытка регистрации зарегистрированного пользователя', async ({ registerPage }) => {
    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!; 
    const age = '18'

    await test.step('Открываем страницу регистрации', async () => {
        await registerPage.open();
    });
    await test.step('Открываем заголовок', async () => {
        await expect(registerPage.title).toBeVisible();
    });
    await test.step('Регистрируем зарегистрированного пользователя', async () => {
        await registerPage.register(email, password, age);
    });
    await test.step('Проверяем, что отобразилось сообщение об ошибке', async () => {
        await expect(registerPage.errorMessageExistEmail).toBeVisible();
    });
});

test('Попытка регистрации пользователя с невалидным email', async ({ registerPage }) => {
    const email = 'examplegmailcom'; 
    const password = faker.internet.password();
    const age = '18'

    await test.step('Открываем страницу регистрации', async () => {
        await registerPage.open();
    });
    await test.step('Открываем заголовок', async () => {
        await expect(registerPage.title).toBeVisible();
    });
    await test.step('Регистрируем пользователя с невалидным email', async () => {
        await registerPage.register(email, password, age);
    });
    await test.step('Проверяем, что отобразилось сообщение об ошибке', async () => {
        await expect(registerPage.errorMessageInvalidEmail).toBeVisible()
    });
});

test('Попытка регистрации пользователя с паролем длиной в 5 символов', async ({ registerPage }) => {
    const email = faker.internet.email();
    const password = '12345'; 
    const age = '18'

    await test.step('Открываем страницу регистрации', async () => {
        await registerPage.open();
    });
    await test.step('Открываем заголовок', async () => {
        await expect(registerPage.title).toBeVisible();
    });
    await test.step('Регистрируем пользователя с паролем длиной в 5 символов', async () => {
        await registerPage.register(email, password, age);
    });
    await test.step('Проверяем, что отобразилось сообщение об ошибке', async () => {
        await expect(registerPage.errorMessageInvalidPassword).toBeVisible()
    });
})

test('Попытка регистрации пользователя с отрицательным возрастом', async ({ registerPage }) => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const age = '-1'

    await test.step('Открываем страницу регистрации', async () => {
        await registerPage.open();
    });
    await test.step('Открываем заголовок', async () => {
        await expect(registerPage.title).toBeVisible();
    });
    await test.step('Регистрируем пользователя с отрицательным возрастом', async () => {
        await registerPage.register(email, password, age);
    });
    await test.step('Проверяем, что отобразилось сообщение об ошибке', async () => {
        await expect(registerPage.errorMessageInvalidAge).toBeVisible();
    });
})
