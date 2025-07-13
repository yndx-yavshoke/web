import { expect } from "@playwright/test";
import { test } from "../fixtures"
import { login, password, ageChanger} from "../fixtures/data.spec"

[{age: 0, status: "Ты молоденький котик"}, {age: 21, status: "Ты молоденький котик"}, {age: 22, status: "Ты взрослый котик"},
    {age: 68, status: "Ты взрослый котик"},{age: 69, status: "Ты старый котик"}, {age: 99, status: "Ты старый котик"} ].forEach(({age, status}) => {
test(`Проверка статуса: При возрасте ${age} - статус ${status}`, async ({ loginPage}) => {
    await test.step("Открыть страницу https://yavshok.ru/login", async () => {
        await loginPage.open()
        await test.step("Отображается страница https://yavshok.ru/login", async () => {
            await expect(loginPage.page).toHaveURL("/login");
        });
        await test.step("Ввести данные от аккаунта и подменить возраст в запросе", async () => {
            await loginPage.page.route("https://api.yavshok.ru/auth/login", (route) => {
                route.fulfill({ contentType: "application/json",json: ageChanger(age) });
            })
            await loginPage.login(login, password);
        });
        await test.step("Отображается страница регистрации", async () => {
            await expect(loginPage.page).toHaveURL("/");
            await expect(loginPage.page.getByTestId("user-logout-button")).toBeVisible();
        })
        await test.step(`Статуc - ${status}`, async () => {
            await expect(loginPage.page.getByText(`${status}`)).toBeVisible();
        })
    })
})
})