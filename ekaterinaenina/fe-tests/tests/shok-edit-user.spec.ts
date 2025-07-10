import { expect } from "@playwright/test";
import {test} from "../fixture/index";
import { faker } from '@faker-js/faker';


test.use({storageState: 'tests/setup/.auth/user.json'});

//тесты для изменения пользователя
test.beforeEach(async ({editPage}) => {
    await test.step("Переход на страницу редактирования пользователя", async () => {
        await editPage.openEditPage();
    });
})

test('Отображается страница редактирования пользователя', async ({editPage}) => {
    await test.step("Отображается заголовок страницы", async () => {
        await expect(editPage.title).toBeVisible();
    });
    await test.step("Отображается поле ввода имени", async () => {
        await expect(editPage.nameInput).toBeVisible();
    });
    await test.step("Отображается кнопка сохранения изменений", async () => {
        await expect(editPage.saveButton).toBeVisible();
    });
    await test.step("Отображается кнопка отмены", async () => {
        await expect(editPage.cancelButton).toBeVisible();
    });
})

test.skip('Нет перехода на страницу профиля после сохранения изменений. change name', async ({editPage}) => {
    const randomName = faker.person.firstName();
    await test.step("Ввод имени и нажатие на кнопку сохранения", async () => {
        await editPage.editName(randomName);
    });
    await test.step("Переход на страницу пользователя https://yavshok.ru", async () => {
        await expect(editPage.userAvatar).toBeVisible();
        await expect(editPage.page).toHaveURL("");
    });
    await test.step("Отображение введенного имени на странице пользователя", async () => {
        await expect(editPage.page.getByText(randomName, {exact: true})).toBeVisible();
    });
})

test('Изменение имени на пустое', async ({editPage}) => {
    await test.step("Ввод пустого имени и нажатие на кнопку сохранения", async () => {
        await editPage.editName("");
    });
    await test.step("Отображение ошибки о пустом имени", async () => {
        await expect(editPage.emptyNameAlert).toBeVisible();
    });
})

test('Работа кнопки Cancel', async ({editPage}) => {
    const randomName = faker.person.firstName();
    await test.step("Ввод имени", async () => {
        await editPage.fillName(randomName);
    });
    await test.step("Нажатие на кнопку отмены", async () => {
        await editPage.clickCancelButton();
    });
    await test.step("Переход на страницу пользователя https://yavshok.ru", async () => {
        await expect(editPage.page).toHaveURL("");
        await expect(editPage.userAvatar).toBeVisible();
    });
    await test.step("Отсутствие введенного имени на странице пользователя", async () => {
        await expect(editPage.page.getByText(randomName, {exact: true})).not.toBeVisible();
    });
})


