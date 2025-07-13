import { test as baseTest } from "@playwright/test";
import { MainPage } from "./MainPage"; // Из файла экспортируется MainPage
import { AuthPage } from "./ShoсLoginPage"; // Из файла экспортируется AuthPage
import { RegistrationPage } from "./RegisterPage"; // Из файла экспортируется RegistrationPage
import { ProfilePage } from "./UserProfilePage"; // Из файла экспортируется ProfilePage
import { ShocEditPage } from "./ShocEditPage"; // Из файла экспортируется ShocEditPage

// Определяем типы для всех фикстур
interface AppFixtures {
    mainPage: MainPage;
    authPage: AuthPage;
    registrationPage: RegistrationPage;
    profilePage: ProfilePage;
    editPage: ShocEditPage;
}

// Расширяем базовый test, добавляя наши фикстуры
export const test = baseTest.extend<AppFixtures>({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
       await mainPage.openMainPage();
        await use(mainPage);
    },

    authPage: async ({ page }, use) => {
        const authPage = new AuthPage(page);
        await authPage.visit();
        await use(authPage);
    },

    registrationPage: async ({ page }, use) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.open();
        await use(registrationPage);
    },

    profilePage: async ({ page }, use) => {
        const profilePage = new ProfilePage(page);
        await profilePage.navigate();
        await use(profilePage);
    },

    editPage: async ({ page }, use) => {
        const editPage = new ShocEditPage(page);
        await editPage.navigate();
        await use(editPage);
    }
});

// Экспортируем типы для использования в тестах
export { expect } from "@playwright/test";
export type { Page } from "@playwright/test";
