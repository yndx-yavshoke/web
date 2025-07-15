import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test('Successful auth', async ({ loginPage, page }) => {
    await test.step('Открыть страницу авторизации', async () => {
        await loginPage.open();
    });

    await test.step('Ввести валидные учетные данные', async () => {
        await loginPage.login('example@domen.ru', '12345678');
    });

    await test.step('Проверить успешную авторизацию', async () => {
        await expect(page.getByTestId('user-edit-profile-button')).toBeVisible();
    });
});

test('Попытка входа с незаполненными полями', async ({ loginPage }) => {
    await test.step('Попытаться войти без заполнения полей', async () => {
        await loginPage.login('', '');
    });

    await test.step('Проверить сообщения об ошибках', async () => {
        await expect(loginPage.page.getByText('Введите email')).toBeVisible();
        await expect(loginPage.page.getByText('Введите пароль')).toBeVisible();
    });
});

test('Попытка входа с неверным паролем', async ({ loginPage }) => {
    await test.step('Ввести корректный email и неверный пароль', async () => {
        await loginPage.login('example@domen.ru', 'wrongPassword');
    });

    await test.step('Проверить сообщение об ошибке', async () => {
        await expect(loginPage.page.getByText('Неправильный логин или пароль')).toBeVisible();
    });
});

test('Проверка перехода на страницу регистрации', async ({ loginPage }) => {
    await test.step('Открыть страницу авторизации', async () => {
        await loginPage.open();
    });

    await test.step('Нажать кнопку перехода к регистрации', async () => {
        await loginPage.goRegist();
    });

    await test.step('Проверить переход на страницу регистрации', async () => {
        await expect(loginPage.page).toHaveURL('/register');
        await expect(loginPage.page.getByText('Регистрация в ШОКе')).toBeVisible();
    });
});