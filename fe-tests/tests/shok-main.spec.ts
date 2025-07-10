import { expect } from "@playwright/test"
import { test } from '../screens/index'
import { validEmailPassword } from "../constants/testData"
import { faker, fakerRU } from "@faker-js/faker"

test('Проверка наличия email в БД', async ({mainPage}) => {
    await mainPage.open();
    await mainPage.checkEmailTrue(validEmailPassword.myEmailInBase)
})

test('Проверка отсутствующего email вв БД', async ({mainPage}) => {
    await mainPage.open();
    await mainPage.checkEmailFalse(validEmailPassword.emailNotInBase)
})

// test('Проверка, что кнопка не активна при вводе невалидного email', async ({mainPage}) => {
//     const brokenEmail = faker.internet
//         .email()
//         .replace('@', '_')
//         .replace('.', '')
    
//     await mainPage.open();
//     await expect(mainPage.checkButton).toBeVisible();
//     await expect(mainPage.checkButton).not.toBeDisabled();
//     await expect(mainPage.input.fill(brokenEmail));
//     await expect(mainPage.checkButton).toBeDisabled();
// })

test('Проверка кнопки перехода =В шок=', async ({mainPage, autorizePage}) => {
    await mainPage.open();
    await expect(mainPage.toLoginButton).toBeVisible();
    await mainPage.toLoginButton.click();

    await expect(autorizePage.title).toBeVisible()
})

test('Проверка наличия плейсхолдера в поле ввода', async ({mainPage}) => {
    await mainPage.open();
    await expect(mainPage.input).toBeVisible();
    await expect(mainPage.input).toHaveAttribute('placeholder', 'Введите email')
})

