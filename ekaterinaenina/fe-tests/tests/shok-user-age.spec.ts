import { expect } from "@playwright/test";
import {test} from "../fixture/index";


test.use({storageState: 'tests/setup/.auth/user.json'});

//тесты на возраст
test('Отображение надписи для молодого котика', async ({userPage}) => {
    await userPage.page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(mockExperiments20isYoung)
        });
    })
    await test.step("Отображается страница пользователя https://yavshok.ru/", async () => {
        await userPage.open();
    });
    await test.step("Отображается надпись 'Ты молодой котик'", async () => {
        await expect(userPage.youngCat).toBeVisible();
    });
})

test.skip('Отображение надписи для взрослого котика', async ({userPage}) => {
    await userPage.page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(mockExperiments20isAdult)
        });
    })
    await test.step("Отображается страница пользователя https://yavshok.ru/", async () => {
        await userPage.open();
    });
    await test.step("Отображается надпись 'Ты взрослый котик'", async () => {
        await expect(userPage.adultCat).toBeVisible();
    });
})

test('Отображение надписи для старого котика', async ({userPage}) => {
    await userPage.page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(mockExperiments20isOld)
        });
    })
    await test.step("Отображается страница пользователя https://yavshok.ru/", async () => {
        await userPage.open();
    });
    await test.step("Отображается надпись 'Ты старый котик'", async () => {
        await expect(userPage.oldCat).toBeVisible();
    });
})

const mockExperiments20isYoung = {
    "flags":{
        "age":{
        "enabled":true,
        "young":{
            "from":0,
            "to":21
        },
        "adult":{
            "from":22,
            "to":68
        },
        "old":{
            "from":69,
            "to":99
        },
        "oldFrom":30,
        "youngFrom":2
}}};
const mockExperiments20isAdult = {
    "flags":{
        "age":{
        "enabled":true,
        "young":{
            "from":0,
            "to":4
        },
        "adult":{
            "from":5,
            "to":29
        },
        "old":{
            "from":30,
            "to":99
        },
        "oldFrom":30,
        "youngFrom":2
}}};
const mockExperiments20isOld = {
    "flags":{
        "age":{
        "enabled":true,
        "young":{
            "from":0,
            "to":4
        },
        "adult":{
            "from":5,
            "to":14
        },
        "old":{
            "from":15,
            "to":99
        },
        "oldFrom":15,
        "youngFrom":2
}}};