import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { ProfilePage } from '../pages/ProfilePage';
import { EditPage } from '../pages/EditPage';

export function createPages(browser: any) {
    return {
        loginPage: new LoginPage(browser),
        mainPage: new MainPage(browser),
        profilePage: new ProfilePage(browser),
        editPage: new EditPage(browser),
    };
} 