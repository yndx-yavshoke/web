import { LoginPage } from '../fixtures/LoginPage';
import { MainPage } from '../fixtures/MainPage';
import { ProfilePage } from '../fixtures/ProfilePage';
import { RenamePage } from '../fixtures/RenamePage';

export function createPages(browser: any) {
    return {
        loginPage: new LoginPage(browser),
        mainPage: new MainPage(browser),
        profilePage: new ProfilePage(browser),
        renamePage: new RenamePage(browser),
    };
} 