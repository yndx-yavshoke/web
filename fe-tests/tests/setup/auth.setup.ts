import { test } from '../../fixtures/index';
import { expect, request } from '@playwright/test';
import { registeredEmail, registeredPassword, unregisteredEmail } from "../../fixtures/user-data";

test('login', async ({ loginPage }) => {
    await loginPage.open();
    
    await loginPage.loginToShok(registeredEmail, registeredPassword);
        
    await expect (loginPage.mailInput).not.toBeVisible();
    await expect (loginPage.page).toHaveURL('/');

    await loginPage.page.context().storageState({path: './tests/setup/.auth/user.json'})
})