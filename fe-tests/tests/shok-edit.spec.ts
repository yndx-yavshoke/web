import { expect } from "@playwright/test";
import { test } from '../screens/index';
import { faker, fakerRU, fakerJA, fakerAR } from '@faker-js/faker'
import { ENDPOINTS } from "../constants/testData"

test.use({storageState: 'tests/setup/.auth/user.json'})

test("Проверка наличия плейсхолдера =Ваше имя=", async ({editPage}) => {
    test.step('Переход на страницу https://yavshok.ru/edit', async () => {
        await editPage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/edit', async () => {
        await expect(editPage.page).toHaveURL(ENDPOINTS.endpointEdit)
    })
    await test.step('Отображается поле name', async () => {
        await expect(editPage.inputName).toBeVisible();
    })
    await test.step('Отбражение плейсхолдера в поле name', async () => {
        await expect(editPage.inputName).toHaveAttribute('placeholder', 'Enter your name');
    })    
})

test('проверка работоспособности Cancle', async({editPage, userPage}) => {
    await test.step('Переход на страницу https://yavshok.ru/edit', async () => {
        await editPage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/edit', async () => {
        await expect(editPage.page).toHaveURL(ENDPOINTS.endpointEdit)
    })
    await test.step('Кнопка назад отображается', async () => {
        await expect(editPage.buttonCancle).toBeVisible();
    })
    await test.step('Нажатие на кнопку назад', async () => {
        await editPage.buttonCancle.click();
    })
    await test.step('Отоброжается страница https://yavshok.ru/', async () => {
        await expect(userPage.page).toHaveURL(ENDPOINTS.enpointMain)
    })
    await test.step('Отображается аватар пользователя', async () => {
        await expect(userPage.userAvatar).toBeVisible();
    })    
})

test('Проверка различных ввода и сохранения различных имен, на разных яхыках.', async ({ editPage, userPage }) => {
    
    const testNames = [
        fakerRU.person.fullName(),
        faker.person.fullName(),
        fakerJA.person.fullName(),
        fakerAR.person.fullName(),
        fakerRU.person.firstName() + '😂'
    ]

    for (const name of testNames) {
        await test.step('Переход на страницу изменения, установка рандомного имени и переход на страницу пользователя', async () => {
            await editPage.newName(name);
        })        
        // await test.step('Отоброжается страница https://yavshok.ru/', async () => {
        //     await expect(userPage.page).toHaveURL(ENDPOINTS.enpointMain)
        // })
        await test.step('Отображается аватар пользователя', async () => {
            await expect(userPage.userAvatar).toBeVisible();
        })    
        await test.step('Отображается измененное имя', async () => {
            await expect(editPage.page.getByText(name)).toBeVisible();
        })        
    }
})