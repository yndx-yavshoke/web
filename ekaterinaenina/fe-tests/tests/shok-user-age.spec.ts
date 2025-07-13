import { expect } from "@playwright/test";
import {test} from "../fixture/index";
import { mockExperiments20isAdult, mockExperiments20isOld, mockExperiments20isYoung } from "./mocks";


test.use({storageState: 'tests/setup/.auth/user.json'});

//тесты на возраст
test('Отображение надписи для молодого котика', async ({userPage}) => {
    await userPage.page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(mockExperiments20isYoung)
        });
    })
    await test.step("Открывается страница пользователя", async () => {
        await userPage.open();
    });
    await test.step("Отображается надпись 'Ты молодой котик'", async () => {
        await expect(userPage.youAreCat).toContainText("молоденький");
    });
})

test.skip('Отображение надписи для взрослого котика', async ({userPage}) => {
    await userPage.page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(mockExperiments20isAdult)
        });
    })
    await test.step("Открывается страница пользователя", async () => {
        await userPage.open();
    });
    await test.step("Отображается надпись 'Ты взрослый котик'", async () => {
        await expect(userPage.youAreCat).toContainText("взрослый");
    });
})

test('Отображение надписи для старого котика', async ({userPage}) => {
    await userPage.page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(mockExperiments20isOld)
        });
    })
    await test.step("Открывается страница пользователя", async () => {
        await userPage.open();
    });
    await test.step("Отображается надпись 'Ты старый котик'", async () => {
        await expect(userPage.youAreCat).toContainText("старый");
    });
})
