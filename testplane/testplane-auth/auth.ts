import { selectors } from './selectors';

export async function login(browser: any) {
    await browser.openAndWait('/login');

    const email = process.env.TEST_EMAIL;
        if (!email) {
            throw new Error('TEST_EMAIL is not defined');
        };

        const password = process.env.TEST_PASSWORD;
        if (!password) {
            throw new Error('TEST_PASSWORD is not defined');
        };

    const emailInput = await browser.$(selectors.emailInput);
    const passwordInput = await browser.$(selectors.passwordInput);
    const loginButton = await browser.$(selectors.loginButton);

    await emailInput.setValue(email);
    await passwordInput.setValue(password);
    await loginButton.click();
};
