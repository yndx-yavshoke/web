import { test as base } from '@playwright/test';
import { HomePage } from './pages/home-page';
import { LoginPage } from './pages/login-page';
import { RegistrationPage } from './pages/registration-page';
import { ProfilePage } from './pages/profile-page';

type Fixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    registrationPage: RegistrationPage;
    profilePage: ProfilePage;
};

export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    registrationPage: async ({ page }, use) => {
        await use(new RegistrationPage(page));
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    },
});

export const expect = test.expect;
