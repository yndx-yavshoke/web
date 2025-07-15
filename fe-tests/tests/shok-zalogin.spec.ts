import { expect } from "@playwright/test";
import { test } from '../screens/index'
import MOCK_YANG from '../tests/moks/mockYang'
import MOCK_OLD from '../tests/moks/mockOld.json'
import MOCK_ADULT from '../tests/moks/mockAdult.json'
import { ENDPOINTS } from "../constants/testData"

test.use({storageState: 'tests/setup/.auth/user.json'})

test('Вход под молоденьким котиком', async ({ mainPage, userPage, page}) => {
    await test.step("переход на стартовую страницу https://yavshok.ru/", async () => {
            await userPage.open();
        })
        await test.step('Отоброжается страница https://yavshok.ru/', async () => {
            await expect(page).toHaveURL(ENDPOINTS.enpointMain)
        })
    await test.step("подтягиваем моки из файла", async () => {
        await page.route('https://api.yavshok.ru/experiments', (route) => {
            route.fulfill({
                status: 200, 
                body: JSON.stringify(MOCK_YANG)
            })
        })
    })
    await test.step("заголовок стартовой страницы не отоброжается", async () => {
        await expect(mainPage.title).not.toBeVisible();
    })
    await test.step("отображается аватар на странице пользователя", async () => {
        await expect(userPage.userAvatar).toBeVisible();
    })
    await test.step("отображается статус молоденького котика", async () => {
        await expect(userPage.page.getByText("Ты молоденький котик")).toBeVisible();
    })        
})

test('Вход под старым котиком', async ({ mainPage, userPage, page }) => {
    await test.step("подтягиваем моки из файла", async () => {
        await page.route('https://api.yavshok.ru/experiments', (route) => {
            route.fulfill({
                status: 200, 
                body: JSON.stringify(MOCK_OLD)
            })
        })
    })
    
    await test.step("переход на стартовую страницу https://yavshok.ru/", async () => {
        await userPage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/', async () => {
        await expect(page).toHaveURL(ENDPOINTS.enpointMain)
    })
    
    await test.step("заголовок стартовой страницы не отоброжается", async () => {
        await expect(mainPage.title).not.toBeVisible();
    })
    await test.step("отображается аватар на странице пользователя", async () => {
        await expect(userPage.userAvatar).toBeVisible();
    })
    await test.step("отображается статус старого котика", async () => {
        await expect(userPage.page.getByText("Ты старый котик")).toBeVisible();
    })
})

test.skip('Вход под взрослым котиком', async ({ mainPage, userPage, page }) => {
    await test.step("переход на стартовую страницу https://yavshok.ru/", async () => {
        await userPage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/', async () => {
        await expect(page).toHaveURL(ENDPOINTS.enpointMain)
    })
    await test.step("подтягиваем моки из файла", async () => {
        await page.route('https://api.yavshok.ru/experiments', (route) => {
            route.fulfill({
                status: 200, 
                body: JSON.stringify(MOCK_ADULT)
            })
        })
    })
    await test.step("заголовок стартовой страницы не отоброжается", async () => {
        await expect(mainPage.title).not.toBeVisible();
    })
    await test.step("отображается аватар на странице пользователя", async () => {
        await expect(userPage.userAvatar).toBeVisible();
    })
    await test.step("отображается статус взрослого котика", async () => {
        await expect(userPage.page.getByText("Ты взрослый котик")).toBeVisible();
    })
})

test('проверка работоспособности кнопки Edit', async ({mainPage, userPage, editPage}) => {
    await test.step("переход на стартовую страницу https://yavshok.ru/", async () => {
        await userPage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/', async () => {
        await expect(userPage.page).toHaveURL(ENDPOINTS.enpointMain)
    })
    await test.step("отображается аватар на странице пользователя", async () => {
        await expect(userPage.userAvatar).toBeVisible();
    })
    await test.step('отоброжается кнопка изменения профиля', async () => {
        await expect(userPage.buttonEditProfile).toBeVisible();
    })
    await test.step('нажатие на кнопку изменения пользователя', async () => {
        await userPage.buttonEditProfile.click();
    })
    await test.step('Отображается заголовок страницы изменения пользователя', async () => {
        await expect(editPage.buttonSaveChanges).toBeVisible();
    })
})

