import { expect } from "@playwright/test";
import { test } from "../fixtures"

test("Страница изменения имени: Кнопка Cancel ведёт на экран профиля", async ({ namePage }) => {
    let name: string;
    await test.step("Отображается ли страница изменения имени", async ({}) => {
            await namePage.open();
            await test.step("Отображается страница изменения имени https://yavshok.ru/edit", async () => {
                    await expect(namePage.page).toHaveURL(new RegExp('.*yavshok.ru\/edit(?!\/)'));
            })
            await test.step("Нажимаем кнопку назад", async () => {
                await namePage.cancel.click();
            })
            await test.step("Отображается экран профиля", async () => {
                 await expect(namePage.page).toHaveURL("/")
            })
    })
})

test("Страница изменения имени: Появляется ли нынещнее имя при открытии страницы", async ({ namePage }) => {
    let name: string;
    await test.step("Отображается ли страница изменения имени", async ({}) => {
            await namePage.open();
            await test.step("Отображается страница изменения имени https://yavshok.ru/edit", async () => {
                    await expect(namePage.page).toHaveURL(new RegExp('.*yavshok.ru\/edit(?!\/)'));
            })
            await test.step("Проверяем имя в поле ввода", async () => {
                name = await namePage.name.getAttribute('value');
            })
            await test.step("Возвращаемся на экран профиля", async () => {
                await namePage.cancel.click();
            })
            await test.step("Отображается экран профиля", async () => {
                 await expect(namePage.page).toHaveURL("/")
            })
            await test.step("Имя соответствует имени в профиле", async () => {
                await expect(namePage.page.getByText(name)).toBeVisible();
            })
    })
})

test("Страница изменения имени: Изменение имени на введённое", async ({ namePage }) => {
    let name: string;
    await test.step("Отображается ли страница изменения имени", async ({}) => {
            await namePage.open();
            await test.step("Отображается страница изменения имени https://yavshok.ru/edit", async () => {
                    await expect(namePage.page).toHaveURL(new RegExp('.*yavshok.ru\/edit(?!\/)'));
            })
            await test.step("Вводим новое имя", async () => {
                await namePage.name.fill("newName");
            })
            await test.step("Сохраняем имя и возвращаемся на экран профиля", async () => {
                await namePage.save.click();
                await expect(namePage.page.getByText("Saving...")).not.toBeVisible();
            })
            await test.step("Возвращаемся на экран профиля", async () => {
                await namePage.cancel.click();
            })
            await test.step("Отображается экран профиля", async () => {
                await expect(namePage.page).toHaveURL("/");
            })
            await test.step("Имя соответствует имени в профиле", async () => {
                await expect(namePage.page.getByText("newName")).toBeVisible();
            })
    })
})