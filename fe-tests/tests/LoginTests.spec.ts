import { test } from './fixtures/ShokFixtures'
import { DataGenerator } from './utils/DataGenerator';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Проверка авторизации', () => {
    let email: string;
    let password: string;
    
    test.beforeEach(async ({ userLoginPage }) => {
        await test.step('Открываем страницу авторизации', async () => {
                await userLoginPage.Open();
        });
        await test.step('Проверяем поля ввода и заголовок', async () => {
                await userLoginPage.CheckTitle();
                await userLoginPage.CheckInputEmail();
                await userLoginPage.CheckInputPassword();
        });
    });

    test('Попытка авторизации незарегистрированного пользователя (FAKER TEST)', async ({ userLoginPage }) => {
        await test.step('Вводим несуществующий email и пароль (сгенерированные faker)', async () => {
            email = DataGenerator.GenerateEmail();
            password = DataGenerator.GeneratePassword();
            console.log(`Generated email: ${email}`);
            console.log(`Generated password: ${password}`);
        });
        await test.step('Проверяем, что ошибка о неверном логине или пароле появилась', async () => {
            await userLoginPage.LoginWithInvalidEmailOrPassword(email, password);
        });
    });

    test('Попытка авторизации c пустыми полями', async ({ userLoginPage }) => {
        await userLoginPage.LoginWithEmptyData();
    });

    test('Проверка работоспособности кнопки "Назад"', async ({ userLoginPage }) => {
        await test.step('Проверяем, что кнопка "Назад" присутствует на странице', async () => {
            await userLoginPage.CheckBackButton();
        });
        await test.step('Проверяем, что кнопка "Назад" переводит на главную страницу', async () => {
            await userLoginPage.Back();
        });
    });

    test('Проверка работоспособности кнопки "Регистрация"', async ({ userLoginPage }) => {
        await test.step('Проверяем, что кнопка "Регистрация" присутствует на странице', async () => {
            await userLoginPage.CheckRegisterButton();
        });
        await test.step('Проверяем, что кнопка "Регистрация" переводит на страницу регистрации', async () => {
            await userLoginPage.Register();
        });
    });
});
