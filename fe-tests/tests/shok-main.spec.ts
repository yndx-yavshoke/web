import { expect } from "@playwright/test"
import { test } from '../screens/index'
import { EMAILS } from "../constants/testData"
import { ENDPOINTS } from "../constants/testData"
import { faker } from "@faker-js/faker"

test('Проверка наличия email в БД', async ({mainPage}) => {
    await test.step("переход на стартовую страницу https://yavshok.ru/", async () => {
        await mainPage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/', async () => {
        await expect(mainPage.page).toHaveURL(ENDPOINTS.enpointMain)
    })
    await test.step('Ввод существуещего email и нажатие на кнопку проверки', async () => {
        await mainPage.checkEmailTrue(EMAILS.myEmailInBase)
    })
})

test('Проверка отсутствующего email вв БД', async ({mainPage}) => {
    await test.step("переход на стартовую страницу https://yavshok.ru/", async () => {
        await mainPage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/', async () => {
        await expect(mainPage.page).toHaveURL(ENDPOINTS.enpointMain)
    })
    await test.step('Ввод не существуещго в БД email нажатие на кнопку проверки', async () => {
        await mainPage.checkEmailFalse(EMAILS.emailNotInBase)
    })    
})

test('Проверка, что кнопка не активна при вводе невалидного email', async ({mainPage}) => {
    const brokenEmail = faker.internet
        .email()
        .replace('@', '_')
        .replace('.', '')
    
    await test.step("переход на стартовую страницу https://yavshok.ru/", async () => {
        await mainPage.open();
    })
    await test.step("кнопка проверки шоковсти отображается", async () => {
        await expect(mainPage.checkButton).toBeVisible();
    })
    await test.step("проверка активности кнопки проверки на шковость", async () => {
        await expect(mainPage.checkButton).not.toBeDisabled();
    })    
    await test.step("ввод невалидного email", async () => {
        await mainPage.input.fill(brokenEmail)
    })    
    await test.step("проверка что кнопка шоковсти до сих пор неактивна", async () => {
        await expect(mainPage.checkButton).not.toBeDisabled();
    })    
})

test('Проверка кнопки перехода =В шок=', async ({mainPage, autorizePage}) => {
    await test.step("переход на стартовую страницу https://yavshok.ru/", async () => {
        await mainPage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/', async () => {
        await expect(mainPage.page).toHaveURL(ENDPOINTS.enpointMain)
    })
    await test.step('Отображается кнопка =В шок=', async () => {
        await expect(mainPage.toLoginButton).toBeVisible();
    })
    await test.step("Нажатие на кнопку =В шок=", async () => {
        await mainPage.toLoginButton.click();
    })    
    await test.step('Отоброжается страница https://yavshok.ru/', async () => {
        await expect(autorizePage.page).toHaveURL(ENDPOINTS.endpointLogin)
    })
    await test.step('Отображается заголовок страницы логирования', async () => {
        await expect(autorizePage.title).toBeVisible()
    })
})

test('Проверка наличия плейсхолдера в поле ввода', async ({mainPage}) => {
    await test.step("переход на стартовую страницу https://yavshok.ru/", async () => {
        await mainPage.open();
    })
    test.step("Поле ввода email отоброжается", async () => {
        await expect(mainPage.input).toBeVisible();
    })    
    test.step("Плейсхолде в поле ввода email отображается", async () => {
        await expect(mainPage.input).toHaveAttribute('placeholder', 'Введите email')
    })    
})

test('Проверка повторой валидации email на стартовой странице', async ({mainPage}) => {
    await test.step("переход на стартовую страницу https://yavshok.ru/", async () => {
        await mainPage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/', async () => {
        await expect(mainPage.page).toHaveURL(ENDPOINTS.enpointMain)
    })
    await test.step('Ввод не существуещго в БД email нажатие на кнопку проверки', async () => {
        await mainPage.checkEmailFalse(EMAILS.emailNotInBase)
    })    
    await test.step('Очистка поля ввода email', async () => {
        await mainPage.input.clear()
    })
    await test.step('Ввод существуещего email и нажатие на кнопку проверки', async () => {
        await mainPage.checkEmailTrue(EMAILS.myEmailInBase)
    })
})
