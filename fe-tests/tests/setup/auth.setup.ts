import { test as setup, expect } from '@playwright/test';
import { UserLoginPage } from '../fixtures/UserLoginPage';
import { AuthData } from './authData';
import { UserProfilePage } from '../fixtures/UserProfilePage';
import path from 'path';

const authFile = './tests/setup/auth.json';

setup('Авторизация', async ({ page }) => {

    const loginPage = new UserLoginPage(page);
    const authData = new AuthData();

    await loginPage.Open();

    await loginPage.CheckInputEmail();
    await loginPage.CheckInputPassword();

    await loginPage.Login(authData.getEmail(), authData.getPassword(), true);
    await loginPage.page.waitForURL('/');

    await page.context().storageState({ path: authFile});
});