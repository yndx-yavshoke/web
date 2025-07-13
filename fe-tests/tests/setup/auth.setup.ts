import { expect } from '@playwright/test';
import { test } from '../../screens/index';
import { ENDPOINTS } from "../../constants/testData"

test('login', async ({ autorizePage, userPage, context }) => {
    await test.step('Открытие страницы авторизации', async () => {
        await autorizePage.open();
    })
    await test.step('Страница авторизации отображается', async () => {
        await expect(autorizePage.page).toHaveURL(ENDPOINTS.endpointLogin);
    })
    await test.step('поле ввода email отображается', async () => {
        await expect(autorizePage.inputEmail).toBeVisible();
    })  
    await test.step('поле ввода пароля отображается', async () => {
        await expect(autorizePage.inputPassword).toBeVisible();
    })         
    await autorizePage.logIn('adizen@ya.ru', '123456');
    await test.step('Страница пользователя отображается', async () => {
        await expect(userPage.page).toHaveURL(ENDPOINTS.enpointMain);
    })
    await test.step('кнопка выхода из личного кабинета отображается', async () => {
        await expect(userPage.buttonLogOut).toBeVisible();
    }) 
    await test.step('сохранение данных в user.json', async () => {
        await context.storageState({path : './tests/setup/.auth/user.json'})
    })
    await test.step('нажатие на кнопку выхода из личного кабинета', async () => {
        await userPage.logout();
    })   
})