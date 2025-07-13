import { expect } from "@playwright/test";
import {test} from "../../fixture/index";

test('login', async ({authPage}) => {
    await test.step("Отображается страница https://yavshok.ru/login", async () => {
        await authPage.open();
    })
    await test.step("Вводятся email, пароль и происходит нажатие на кнопку", async () => {
        await authPage.autorizeUser(process.env.EMAIL!, process.env.PASSWORD!);
    });
    await test.step("Происходит загрузка аватарки", async () => {
            await expect(authPage.userAvatar).toBeVisible();
    });
    await authPage.page.context().storageState({path: './tests/setup/.auth/user.json'});
})