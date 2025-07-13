import { test as base } from '@playwright/test';
import { EditProfilePage } from '../pages/EditProfilePage';
import { ProfilePage } from '../pages/ProfilePage';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';

type Fixtures = {
  editPage: EditProfilePage;
  profilePage: ProfilePage;
  mainPage: MainPage;
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
};

export const test = base.extend<Fixtures>({
  editPage: async ({ page }, use) => {
    await use(new EditProfilePage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  
});

export const expect = test.expect;
//export { expect } from '@playwright/test';


