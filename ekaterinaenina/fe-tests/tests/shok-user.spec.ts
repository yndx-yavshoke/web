import { expect } from "@playwright/test";
import {test} from "../fixture/index";


test.use({storageState: 'tests/setup/.auth/user.json'});

//тесты для страницы пользователя
test.beforeEach(async ({userPage}) => {
    await test.step("Открывается страница пользователя", async () => {
        await userPage.open();
    });
})

test('Видимость страницы пользователя', async ({userPage}) => {
    await test.step("Отображается аватар пользователя", async () => {
        await expect(userPage.userAvatar).toBeVisible();
    });
    await test.step("Отображается кнопка редактирования пользоваетля", async () => {
        await expect(userPage.editButton).toBeVisible();
    });
    await test.step("Отображается кнопка выхода", async () => {
        await expect(userPage.logoutButton).toBeVisible();
    });
    await test.step("Отображается надпись про статус котика", async () => {
        await expect(userPage.youAreCat).toBeVisible();
    });
})

test('Работа кнопки Зарегистрироваться', async ({userPage}) => {
    await test.step("Нажатие на кнопку редактирования пользователя", async () => {
        await userPage.editUser();
    });
    await test.step("Происходит переход на страницу редактирования пользователя (заголовок Edit Profile)", async () => {
        await expect(userPage.editPageTitle, "Ожидается заголовок страницы Edit Profile").toBeVisible();
    });
})

test('Работа кнопки выхода', async ({userPage}) => {
    await test.step("Нажатие на кнопку выхода", async () => {
        await userPage.logout();
    });
    await test.step("Отображается страница проверки шоковости (https://yavshok.ru + заголовок Войти в ШОК)", async () => {
        await expect(userPage.page).toHaveURL("");
        await expect(userPage.shokTitle).toBeVisible();
    });
    await test.step("Поле ввода пустое", async () => {
        await expect(userPage.shokEmail).toHaveValue('');;
    });
})
