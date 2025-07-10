import { expect } from "@playwright/test";
import { test } from '../screens/index'
import mockYang from '../tests/moks/mockYang.json'
import mockOld from '../tests/moks/mockOld.json'
import mockAdult from '../tests/moks/mockAdult.json'

test.use({storageState: 'tests/setup/.auth/user.json'})

test('Вход под молоденьким котиком', async ({ mainPage, userPage, page }) => {
    await mainPage.open()
    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200, 
            body: JSON.stringify(mockYang)
        })
    })

    await expect(mainPage.title).not.toBeVisible();
    await expect(userPage.userAvatar).toBeVisible();
    await expect(userPage.page.getByText("Ты молоденький котик")).toBeVisible();
})

test('Вход под старым котиком', async ({ mainPage, userPage, page }) => {
    await mainPage.open()
    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200, 
            body: JSON.stringify(mockOld)
        })
    })

    await expect(mainPage.title).not.toBeVisible();
    await expect(userPage.userAvatar).toBeVisible();
    await expect(userPage.page.getByText("Ты старый котик")).toBeVisible();
})

test.skip('Вход под взрослым котиком', async ({ mainPage, userPage, page }) => {
    await mainPage.open()
    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200, 
            body: JSON.stringify(mockAdult)
        })
    })

    await expect(mainPage.title).not.toBeVisible();
    await expect(userPage.userAvatar).toBeVisible();
    await expect(userPage.page.getByText("Ты взрослый котик")).toBeVisible();
})

test('проверка работоспособности кнопки Edit', async ({mainPage, userPage, editPage}) => {
    await mainPage.open();

    await expect(userPage.userAvatar).toBeVisible();
    await expect(userPage.buttonEditProfile).toBeVisible();
    await userPage.buttonEditProfile.click();
    await expect(editPage.buttonSaveChanges).toBeVisible();
})

