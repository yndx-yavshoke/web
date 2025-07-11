import { expect } from "@playwright/test";
import { test } from '../screens/index';
import { faker, fakerRU, fakerJA, fakerAR } from '@faker-js/faker'

test.use({storageState: 'tests/setup/.auth/user.json'})

test("Проверка наличия плейсхолдера =Ваше имя=", async ({editPage}) => {
    await editPage.open();

    await expect(editPage.inputName).toBeVisible();
    await expect(editPage.inputName).toHaveAttribute('placeholder', 'Enter your name');
})

test('проверка работоспособности Cancle', async({editPage, userPage}) => {
    await editPage.open();

    await expect(editPage.buttonCancle).toBeVisible();
    await editPage.buttonCancle.click();

    await expect(userPage.userAvatar).toBeVisible();
})

test('Проверка различных ввода и сохранения различных имен, на разных яхыках.', async ({ editPage, userPage }) => {
    // await editPage.open();

    const testNames = [
        fakerRU.person.fullName(),
        faker.person.fullName(),
        fakerJA.person.fullName(),
        fakerAR.person.fullName(),
        fakerRU.person.firstName() + '😂'
    ]

    for (const name of testNames) {
        await editPage.newName(name);
        await expect(userPage.userAvatar).toBeVisible({timeout : 15000});
        await expect(editPage.page.getByText(name)).toBeVisible();
    }
})