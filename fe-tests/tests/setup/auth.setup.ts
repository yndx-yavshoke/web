import {test} from '../../fixtures/index';
import {expect} from '@playwright/test';

test('login', async ({page}) => {
    await page.goto('/login');
    await page.getByTestId('login-email-input').fill('test123456@test.com');
    await page.getByTestId('login-password-input').fill('123456');

    await page.getByTestId('login-submit-button').click();

    await expect(page.getByTestId('user-logout-button')).toBeVisible();

    await page.context().storageState({path: './tests/setup/.auth/user.json'})

})