import { test as setup } from '../../fixtures/index';

setup('login', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login();
});
