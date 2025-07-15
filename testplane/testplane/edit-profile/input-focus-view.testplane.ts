describe('Edit Profile Page – Input Focus', () => {
    async function prepareEditScreen(browser) {
        await browser.url('/');
        await browser.pause(1200);
        const avatarHandle = await browser.$('[data-testid="user-avatar"]').catch(() => null);
        if (!avatarHandle) {
            await browser.url('/login');
            await browser.pause(1500);
            const emailFld = await browser.$('[data-testid="login-email-input"]');
            const pwdFld   = await browser.$('[data-testid="login-password-input"]');
            const submitBtn= await browser.$('[data-testid="login-submit-button"]');
            await emailFld.waitForDisplayed({ timeout: 8000 });
            await emailFld.setValue('molodoy@list.ru');
            await pwdFld.setValue('123456');
            await submitBtn.click();
            await browser.pause(800);
        }
        await browser.url('/edit');
        await browser.pause(1200);
        await (await browser.$('[data-testid="edit-name-input"]')).waitForDisplayed({ timeout: 8000 });
    }

    it('Name input', async ({ browser }) => {
        await prepareEditScreen(browser);

        const nameFld = await browser.$('[data-testid="edit-name-input"]');
        await nameFld.click();
        await browser.pause(500);

        await browser.assertView('edit-name-focus', '[data-testid="edit-name-input"]');
    });
});
