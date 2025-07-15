describe('Logout Button test', () => {
    async function authenticateUser(browser) {
        await browser.url('/');
        await browser.pause(1600);

        const avatarHandle = await browser.$('[data-testid="user-avatar"]').catch(() => null);
        if (!avatarHandle) {
            await browser.url('/login');
            await browser.pause(2100);

            const loginField = await browser.$('[data-testid="login-email-input"]');
            const passField  = await browser.$('[data-testid="login-password-input"]');
            const signBtn    = await browser.$('[data-testid="login-submit-button"]');

            await loginField.waitForDisplayed({ timeout: 9000 });
            await loginField.setValue('molodoy@list.ru');
            await passField.setValue('123456');
            await signBtn.click();

            await (await browser.$('[data-testid="user-avatar"]')).waitForDisplayed({ timeout: 15000 });
            await browser.pause(700);
        }
    }

    it('If logout button correct', async ({ browser }) => {
        await authenticateUser(browser);
        await browser.pause(600);

        const btn = await browser.$('[data-testid="user-logout-button"]');
        await btn.waitForDisplayed({ timeout: 5000 });

        await browser.assertView('logout-btn-view', '[data-testid="user-logout-button"]');
    });
});
