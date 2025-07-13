import { test } from '../../fixtures/index';
import { expect } from '@playwright/test';

test('login', async ({ loginPage, page }) => {
    
    await loginPage.login('example@domen.ru', '12345678');
    
    await expect(page.getByTestId('user-logout-button')).toBeVisible();
    
    await page.context().storageState({ path: './tests/setup/auth/user.json' });
});