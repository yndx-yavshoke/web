import { ShockChangeNamePage } from './ShockChangeNamePage';
import { ShockRegisterPage } from './ShockRegisterPage';
import { ShockLoginPage } from './ShockLoginPage';
import { ShockMainPage } from './ShockMainPage';
import { ShockProfilePage } from './ShockProfilePage';

export interface IShockPages {
    mainPage: ShockMainPage;
    loginPage: ShockLoginPage;
    registerPage: ShockRegisterPage;
    changeNamePage: ShockChangeNamePage;
    profilePage: ShockProfilePage;
}
