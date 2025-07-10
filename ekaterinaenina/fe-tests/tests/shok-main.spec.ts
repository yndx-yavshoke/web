import { expect } from "@playwright/test";
import {test} from "../fixture/index";


//тесты для стартовой страницы
test.beforeEach(async ({mainPage}) => {
    await test.step("Отображается страница https://yavshok.ru", async () => {
        await mainPage.open();
    });
})

test('Отображение страницы Я в ШОКе', async ({mainPage}) => {
    await test.step("Отображается заголовок страницы", async () => {
        await expect(mainPage.title).toBeVisible();
    });
    await test.step("Отображается кнопка Я в ШОКе", async () => {
        await expect(mainPage.checkButton).toBeVisible();
    });
    await test.step("Отображается кнопка В ШОК", async () => {
        await expect(mainPage.toLoginButton).toBeVisible();
    });
})

test('Проверка ввода зарегестрированного email на странице Я в ШОКе', async ({mainPage}) => {
    await test.step("Вводится email и происходит нажатие на кнопку", async () => {
        await mainPage.checkEmail("tester@mail.ru");
    });
    await test.step("Отображается надпись Ты уже в ШОКе", async () => {
        await expect(mainPage.userInShock, "Ожидалась надпись Ты уже в ШОКе").toBeVisible();
    });
})

test('Проверка ввода незарегестрированного email на странице Я в ШОКе', async ({mainPage}) => {
    await test.step("Вводится email и происходит нажатие на кнопку", async () => {
        await mainPage.checkEmail("testerNotExist@mail.ru");
    });
    await test.step("Отображается надпись Ты ещё не в ШОКе", async () => {
        await expect(mainPage.userNotInShock, "Ожидалась надпись Ты ещё не в ШОКе").toBeVisible();
    });
})

test('Работа кнопки В ШОК', async ({mainPage}) => {
    await test.step("Нажатие на кнопку В ШОК", async () => {
        await mainPage.goToLoginPage();
    });
    await test.step("Отображается страница https://yavshok.ru/login", async () => {
        await expect(mainPage.page).toHaveURL("/login");
    });
})