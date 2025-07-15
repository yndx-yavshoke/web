describe('Edit Profile Page – Layout Check', () => {
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

    it('Buttons and title check', async ({ browser }) => {
        await prepareEditScreen(browser);
        await browser.assertView('edit-layout', 'body', {
            ignoreElements: ['[data-testid="edit-name-input"]']
        });
    });
});
