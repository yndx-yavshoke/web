import { expect } from "@playwright/test";
import {test} from "../fixture/index";


//тесты для страницы авторизации
test.beforeEach(async ({authPage}) => {
    await test.step("Открывается страница авторизации (/login)", async () => {
        await authPage.open();
    })
})

test('Страница авторизации отображается', async ({authPage}) => {
    await test.step("Отображается заголовок страницы", async () => {
        await expect(authPage.title).toBeVisible();
    });
    await test.step("Отображается поле для ввода email", async () => {
        await expect(authPage.email).toBeVisible();
    });
    await test.step("Отображается поле для ввода пароля", async () => {
        await expect(authPage.password).toBeVisible();
    });
    await test.step("Отображается кнопка Назад", async () => {
        await expect(authPage.loginButton).toBeVisible();
    });
    await test.step("Отображается кнопка Назад", async () => {
        await expect(authPage.backButton).toBeVisible();
    });
    await test.step("Отображается кнопка перехода на страницу регистрации", async () => {
        await expect(authPage.registerButton).toBeVisible();
    });
    
})

test('Вход зарегестрированного пользоваетля', async ({authPage}) => {
    await test.step("Вводятся email, пароль и происходит нажатие на кнопку", async () => {
        await authPage.autorizeUser(process.env.EMAIL!, process.env.PASSWORD!);
    });
    await test.step("Проиходит переход на страницу пользователя (https://yavshok.ru/ + аватарка)", async () => {
        await expect(authPage.page).toHaveURL("");
        await expect(authPage.userAvatar).toBeVisible();
    });
})

test('Вход с неправильным паролем', async ({authPage}) => {
    await test.step("Вводятся email, пароль и происходит нажатие на кнопку", async () => {
        await authPage.autorizeUser(process.env.EMAIL!, "123456");
    });
    await test.step("Отображается надпись: Неправильный логин или пароль", async () => {
        await expect(authPage.unRegisterUserReaction, "Ожидалась надпись Неправильный логин или пароль").toBeVisible();
    });
})

test('Работа кнопки Назад', async ({authPage}) => {
    await test.step("Нажатие на кнопку Назад", async () => {
        await authPage.goToBackPage();
    });
    await test.step("Отображается страница проверки шоковости (https://yavshok.ru + заголовок Я в ШОКе)", async () => {
        await expect(authPage.page).toHaveURL("");
        await expect(authPage.shokTitle, "Ожидается заголовок страницы Я в ШОКе").toBeVisible();
    });
})