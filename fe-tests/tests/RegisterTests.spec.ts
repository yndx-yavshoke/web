import { test } from './fixtures/ShokFixtures';
import { DataGenerator } from './utils/DataGenerator';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Проверка регистрации', () => {
    var userData: { email: string; password: string; age: string };
    
    test.beforeEach(async ({ userRegisterPage }) => {
        await test.step('Открываем страницу регистрации', async () => {
            await userRegisterPage.Open();
        });
        await test.step('Проверяем отображение UI-элементов', async () => {
            await userRegisterPage.CheckTitle();
            await userRegisterPage.CheckInputEmail();
            await userRegisterPage.CheckInputPassword();
            await userRegisterPage.CheckInputAge();
            await userRegisterPage.CheckRegisterButton();
            await userRegisterPage.CheckBackButton();
        });
    });
    
    test('Проверка регистрации с валидными данными', async ({ userRegisterPage }) => {
        await test.step('Генерируем валидные данные', async () => {
            userData = DataGenerator.GenerateFakeUserData();
        });
        await test.step('Вводим валидные данные и переходим в профиль', async () => {
            await userRegisterPage.Register(userData.email, userData.password, userData.age, true);
        });
    });
    
    test('Проверка регистрации с невалидными данными', async ({ userRegisterPage }) => {
        await test.step('Генерируем невалидные данные', async () => {
            userData = DataGenerator.GenerateInvalidUserData();
        });
        await test.step('Вводим невалидные данные и проверяем отображение ошибок', async () => {
            await userRegisterPage.Register(userData.email, userData.password, userData.age, false);
        });
    });

    test('Проверка регистрации с пустыми данными', async ({ userRegisterPage }) => {
        await test.step('Генерируем пустые данные', async () => {
            userData = DataGenerator.GenerateEmptyUserData();
        });
        await test.step('Вводим пустые данные и проверяем отображение ошибок', async () => {
            await userRegisterPage.RegisterWithEmptyData(userData.email, userData.password, userData.age);
        });
    });

    test('Проверка перехода на страницу авторизации по кнопке "Назад"', async ({ userRegisterPage }) => {
        await test.step('Проверяем, что кнопка "Назад" присутствует на странице', async () => {
            await userRegisterPage.CheckBackButton();
        });
        await test.step('Проверяем, что кнопка "Назад" переводит на страницу авторизации', async () => {
            await userRegisterPage.Back();
        });
    });
});