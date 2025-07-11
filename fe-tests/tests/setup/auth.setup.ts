import { expect } from '@playwright/test';
import { test } from '../../screens/index';


test('login', async ({ autorizePage, userPage, context }) => {
    await autorizePage.open();
    await expect(autorizePage.inputEmail).toBeVisible();
    await autorizePage.logIn('adizen@ya.ru', '123456');


    await expect(userPage.buttonLogOut).toBeVisible();
    await context.storageState({path : './tests/setup/.auth/user.json'})
    await userPage.logout();

    
})