import { expect } from "@playwright/test";
import { test } from '../../fixtures/index'
import dotenv from 'dotenv';

dotenv.config();

test('login', async ({ page }) => {
    const email = process.env.EMAIL!; 
    const password = process.env.PASSWORD!; 
    
    await page.goto('/login');
    await page.getByTestId('login-email-input').fill(email);
    await page.getByTestId('login-password-input').fill(password);

    await page.getByTestId('login-submit-button').click();

    await expect(page.getByTestId('user-logout-button')).toBeVisible();

    await page.context().storageState({path: './tests/setup/.auth/user.json'})
})