import { expect } from "@playwright/test";
import { test } from "../fixtures"

test("Страница Регистрации: Кнопка назад ведёт на страницу логина", async ({ registerPage }) => {
    await test.step("Открыть страницу https://yavshok.ru/register", async () => {
        await registerPage.open();
        await expect(registerPage.title).toBeVisible()
        await test.step("Отображается страница https://yavshok.ru/register", async () => {
            await expect(registerPage.page).toHaveURL("/register");
            await expect(registerPage.title).toBeVisible();
        })
        await test.step("Нажать кнопку назад", async () => {
            await registerPage.return.click();
        })
        await test.step("Отображается страница логина", async () => {
            await expect(registerPage.page).toHaveURL("/login");
        })
})
})


test("Страница Регистрации: При пустом поле Email при нажатии кнопки Зарегистрироваться появляется поле Введите Email", async ({ registerPage }) => {
    await test.step("Открыть страницу https://yavshok.ru/register", async () => {
        await registerPage.open();
        await expect(registerPage.title).toBeVisible()
        await test.step("Отображается страница https://yavshok.ru/register", async () => {
            await expect(registerPage.page).toHaveURL("/register");
            await expect(registerPage.title).toBeVisible();
        })
        await test.step("Ввести значения в поля", async () => {
            await registerPage.registrate(null, "111111", "28");
        })
        await test.step("Появляется поле Введите Email", async () => {
            await expect(registerPage.page.getByText("Введите email")).toBeVisible();
        })
})
})

test("Страница Регистрации: При пустом поле Пароль при нажатии кнопки Зарегистрироваться появляется поле Введите Пароль", async ({ registerPage }) => {
    await test.step("Открыть страницу https://yavshok.ru/register", async () => {
        await registerPage.open();
        await expect(registerPage.title).toBeVisible()
        await test.step("Отображается страница https://yavshok.ru/register", async () => {
            await expect(registerPage.page).toHaveURL("/register");
            await expect(registerPage.title).toBeVisible();
        })
        await test.step("Ввести значения в поля", async () => {
            await registerPage.registrate("mail@mail.ru", null, "28");
        })
        await test.step("Появляется поле Введите Пароль", async () => {
            await expect(registerPage.page.getByText("Введите пароль")).toBeVisible();
        })
})
})

test("Страница Регистрации: При пустом поле Возраст при нажатии кнопки Зарегистрироваться появляется поле Введите Возраст", async ({ registerPage }) => {
    await test.step("Открыть страницу https://yavshok.ru/register", async () => {
        await registerPage.open();
        await expect(registerPage.title).toBeVisible()
        await test.step("Отображается страница https://yavshok.ru/register", async () => {
            await expect(registerPage.page).toHaveURL("/register");
            await expect(registerPage.title).toBeVisible();
        })
        await test.step("Ввести значения в поля", async () => {
            await registerPage.registrate("mail@mail.ru", "111111", null);
        })
        await test.step("Появляется поле Введите Возраст", async () => {
            await expect(registerPage.page.getByText("Введите возраст")).toBeVisible();
        })
})
})