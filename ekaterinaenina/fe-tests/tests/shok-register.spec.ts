import { expect } from "@playwright/test";
import {test} from "../fixture/index";
import { faker } from '@faker-js/faker';

//тесты для страницы регистрации
test.beforeEach(async ({registerPage}) => {
    await test.step("Отображается страница https://yavshok.ru/register", async () => {
        await registerPage.open();
    })
})

test('Отображение страницы регистрации', async ({registerPage}) => {
    await test.step("Отображается заголовок страницы", async () => {
        await expect(registerPage.title).toBeVisible();
    });
    await test.step("Отображается поле для ввода email", async () => {
        await expect(registerPage.email).toBeVisible();
    });
    await test.step("Отображается поле для ввода пароля", async () => {
        await expect(registerPage.password).toBeVisible();
    });
    await test.step("Отображается поле для ввода возраста", async () => {
        await expect(registerPage.age).toBeVisible();
    });
    await test.step("Отображается кнопка регистрации", async () => {
        await expect(registerPage.registerButton).toBeVisible();
    });
    await test.step("Отображается кнопка Назад", async () => {
        await expect(registerPage.backButton).toBeVisible();
    });
})

test.skip('Проверка успешной регистрации', async ({registerPage}) => {
    await test.step("Вводятся email, пароль, возраст и происходит нажатие на кнопку", async () => {
        const randomEmail = faker.internet.email(); 
        const age = faker.number.int({ min: 1, max: 100 });
        const password: string = faker.internet.password();
        await registerPage.registerUser(randomEmail, password, age.toString());
    });
    await test.step("Проиходит переход на страницу пользователя", async () => {
        await expect(registerPage.page).toHaveURL("");
        await expect(registerPage.userAvatar).toBeVisible();
    });
    await test.step("Отображается имя пользователя по умолчанию", async () => {
        await expect(registerPage.userName, "Ожидается имя Neko").toBeVisible();
    });
})

test('Регистрация с пропущенными данными', async ({registerPage}) => {
    await test.step("Вводятся пустые email, пароль, возраст и происходит нажатие на кнопку", async () => {
        await registerPage.registerUser("", "", "");
    });
    await test.step("Показаны сообщения об ошибке", async () => {
       await expect(registerPage.missingEmailReaction, "Ожидалась надпись Введите email").toBeVisible();
       await expect(registerPage.missingPasswordReaction, "Ожидалась надпись Введите пароль").toBeVisible();
       await expect(registerPage.missingAgeReaction, "Ожидалась надпись Введите возраст").toBeVisible();
    });
})

test('Работа кнопки Назад', async ({registerPage}) => {
    await test.step("Нажатие на кнопку Назад", async () => {
        await registerPage.goToBackPage();
    });
    await test.step("Отображается страница авторизации", async () => {
        await expect(registerPage.page).toHaveURL("/login");
    });
})
