import { test, expect } from '@playwright/test';
import { UserRegisterPage } from './fixtures/UserRegisterPage';


test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Проверка регистрации', () => {
    let registerPage: UserRegisterPage;
    var userData: { email: string; password: string; age: string };
    
    test.beforeEach(async ({ page }) => {
        registerPage = new UserRegisterPage(page);
        await test.step('Открываем страницу регистрации', async () => {
            await registerPage.Open();
        });
        await test.step('Проверяем отображение UI-элементов', async () => {
            await registerPage.CheckTitle();
            await registerPage.CheckInputEmail();
            await registerPage.CheckInputPassword();
            await registerPage.CheckInputAge();
            await registerPage.CheckRegisterButton();
            await registerPage.CheckBackButton();
        });
    });
    
    test('Проверка регистрации с валидными данными', async ({ page }) => {
        await test.step('Генерируем валидные данные', async () => {
            userData = registerPage.GenerateFakeUserData();
        });
        await test.step('Вводим валидные данные и переходим в профиль', async () => {
            await registerPage.Register(userData.email, userData.password, userData.age, true);
        });
    });
    
    test('Проверка регистрации с невалидными данными', async ({ page }) => {
        await test.step('Генерируем невалидные данные', async () => {
            userData = registerPage.GenerateInvalidUserData();
        });
        await test.step('Вводим невалидные данные и проверяем отображение ошибок', async () => {
            await registerPage.Register(userData.email, userData.password, userData.age, false);
        });
    });

    test('Проверка регистрации с пустыми данными', async ({ page }) => {
        await test.step('Генерируем пустые данные', async () => {
            userData = registerPage.GenerateEmptyUserData();
        });
        await test.step('Вводим пустые данные и проверяем отображение ошибок', async () => {
            await registerPage.RegisterWithEmptyData(userData.email, userData.password, userData.age);
        });
    });

    test('Проверка перехода на страницу авторизации по кнопке "Назад"', async ({ page }) => {
        await test.step('Проверяем, что кнопка "Назад" присутствует на странице', async () => {
            await registerPage.CheckBackButton();
        });
        await test.step('Проверяем, что кнопка "Назад" переводит на страницу авторизации', async () => {
            await registerPage.Back();
        });
    });
});