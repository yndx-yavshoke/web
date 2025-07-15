import { test, expect } from '@playwright/test';
import { UserLoginPage } from './fixtures/UserLoginPage';
import { faker } from '@faker-js/faker';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Проверка авторизации', () => {
    let loginPage: UserLoginPage;
    let email: string;
    let password: string;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new UserLoginPage(page);
        await test.step('Открываем страницу авторизации', async () => {
                await loginPage.Open();
        });
        await test.step('Проверяем поля ввода и заголовок', async () => {
                await loginPage.CheckTitle();
                await loginPage.CheckInputEmail();
                await loginPage.CheckInputPassword();
        });
    });

    test('Попытка авторизации незарегистрированного пользователя (FAKER TEST)', async ({ page }) => {
        await test.step('Вводим несуществующий email и пароль (сгенерированные faker)', async () => {
            email = faker.internet.email();
            password = faker.internet.password();
            console.log(`Generated email: ${email}`);
            console.log(`Generated password: ${password}`);
        });
        await test.step('Проверяем, что ошибка о неверном логине или пароле появилась', async () => {
            await loginPage.LoginWithInvalidEmailOrPassword(email, password);
        });
    });

    test('Попытка авторизации c пустыми полями', async ({ page }) => {
        await loginPage.LoginWithEmptyData();
    });

    test('Проверка работоспособности кнопки "Назад"', async ({ page }) => {
        await test.step('Проверяем, что кнопка "Назад" присутствует на странице', async () => {
            await loginPage.CheckBackButton();
        });
        await test.step('Проверяем, что кнопка "Назад" переводит на главную страницу', async () => {
            await loginPage.Back();
        });
    });

    test('Проверка работоспособности кнопки "Регистрация"', async ({ page }) => {
        await test.step('Проверяем, что кнопка "Регистрация" присутствует на странице', async () => {
            await loginPage.CheckRegisterButton();
        });
        await test.step('Проверяем, что кнопка "Регистрация" переводит на страницу регистрации', async () => {
            await loginPage.Register();
        });
    });
});
