import { test as base } from '@playwright/test';
import { ShokLoginPage } from '../Pages/LoginPage';
import { expect } from '@playwright/test';

export const authTest = base.extend<{ authState: string }>({
  authState: async ({ page }, use) => {
    const loginPage = new ShokLoginPage(page);
    await loginPage.open();
    await loginPage.login('abogsysa@yandex.ru', '12345678m');
    await expect(page.getByTestId('user-logout-button')).toBeVisible();
    const path = './tests/setup/auth.json';
    await page.context().storageState({ path });
    await use(path);
  }
});

export { expect } from '@playwright/test';