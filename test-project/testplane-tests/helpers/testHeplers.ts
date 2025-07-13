import { LoginPage } from '../pages/loginPage';
import { MainPage } from '../pages/mainPage';
import { ProfilePage } from '../pages/profilePage';
import { EditPage } from '../pages/editPage';

export function createPages(browser: any) {
    return {
        loginPage: new LoginPage(browser),
        mainPage: new MainPage(browser),
        profilePage: new ProfilePage(browser),
        editPage: new EditPage(browser),
    };
} 
