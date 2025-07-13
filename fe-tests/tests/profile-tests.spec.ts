import { expect } from "@playwright/test";
import { test } from "../fixtures"

test.use({ storageState: "./tests/state/user.json"})

test("Страница Профиля: Ведёт ли кнопка Logout на начальную страницу", async ({ profilePage}) => {
    await test.step("Открыть страницу профиля https://yavshok.ru/", async () => {
        await profilePage.open();
        await test.step("Открыта страница профиля https://yavshok.ru/", async () => {
            await expect(profilePage.page).toHaveURL("/");
            await expect(profilePage.logout).toBeVisible();
        })
        await test.step("Нажать кнопку Logout", async () => {
            await profilePage.logout.click();
        })
        await test.step("Открыта начальная страница https://yavshok.ru/", async () => {
            await expect(profilePage.page).toHaveURL("/");
            await expect(profilePage.page.getByText("Я в ШОКе").first()).toBeVisible();
        })
    })
})

test("Страница Профиля: Ведёт ли кнопка Edit Profile на страницу смены имени", async ({ profilePage}) => {
    await test.step("Открыть страницу профиля https://yavshok.ru/", async () => {
        await profilePage.open();
        await test.step("Открыта страница профиля https://yavshok.ru/", async () => {
            await expect(profilePage.page).toHaveURL("/");
            await expect(profilePage.logout).toBeVisible();
        })
        await test.step("Нажать кнопку Edit Profile", async () => {
            await profilePage.edit.click();
        })
        await test.step("Открыта страница смены имени https://yavshok.ru/edit", async () => {
            await expect(profilePage.page).toHaveURL(new RegExp('.*yavshok.ru\/edit(?!\/)'));
        })
    })
})

