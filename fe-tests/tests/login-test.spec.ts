import { expect } from "@playwright/test";
import { test } from "../fixtures"

test("Страница Логина: Кнопка Регистрация ведёт на страницу регистрации", async ({ loginPage}) => {
    await test.step("Открыть страницу https://yavshok.ru/login", async () => {
        await loginPage.open()
        await test.step("Отображается страница https://yavshok.ru/login", async () => {
            await expect(loginPage.page).toHaveURL("/login");
            await expect(loginPage.title).toBeVisible();
        });
        await test.step("Нажать кнопку Регистрация", async () => {
            await loginPage.registration.click();
        });
        await test.step("Отображается страница регистрации", async () => {
            await expect(loginPage.page).toHaveURL("/register");
        })
    })
})

test("Страница Логина: Кнопка Назад ведёт на начальную страницу", async ({ loginPage}) => {
    await test.step("Открыть страницу https://yavshok.ru/login", async () => {
        await loginPage.open()
        await test.step("Отображается страница https://yavshok.ru/login", async () => {
            await expect(loginPage.page).toHaveURL("/login");
            await expect(loginPage.title).toBeVisible();
        });
        await test.step("Нажать кнопку Назад", async () => {
            await loginPage.return.click();
        });
        await test.step("Отображается начальная страница", async () => {
            await expect(loginPage.page).toHaveURL("/");
        })
    })
})


test("Страница Логина: При нажатии на кнопку В шок при пустом поле Email надпись Введите email", async ({loginPage}) => {
    await test.step("Открыть страницу https://yavshok.ru/login", async () => {
        await loginPage.open()
        await test.step("Отображается страница https://yavshok.ru/login", async () => {
            await expect(loginPage.page).toHaveURL("/login");
            await expect(loginPage.title).toBeVisible();
        });
        await test.step("Ввести пароль и сделать логин", async () => {
            await loginPage.login(null, "123456");
        });
        await test.step("Проверить всплывщую надпись", async () => {
            await loginPage.page.getByText("Введите email")
        })
    })
})


test("Страница Логина: При нажатии на кнопку В шок при пустом поле Email надпись Введите пароль", async ({loginPage}) => {
    await test.step("Открыть страницу https://yavshok.ru/login", async () => {
        await loginPage.open()
        await test.step("Отображается страница https://yavshok.ru/login", async () => {
            await expect(loginPage.page).toHaveURL("/login");
            await expect(loginPage.title).toBeVisible();
        });
        await test.step("Ввести почту и сделать логин", async () => {
            await loginPage.login("test@mail.ru", null);
        });
        await test.step("Проверить всплывщую надпись", async () => {
            await loginPage.page.getByText("Введите пароль")
        })
    })
})