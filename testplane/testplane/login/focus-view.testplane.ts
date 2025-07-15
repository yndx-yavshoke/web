describe('Sign‑In test Focus', () => {
    it('Email field test', async ({ browser }) => {
        await browser.url('/login');
        await browser.pause(800);
        const emailFld = await browser.$('[data-testid="login-email-input"]');
        await emailFld.click();
        await browser.assertView('login‑focus‑email', 'body');
    });

    it('Password field test', async ({ browser }) => {
        await browser.openAndWait('/login');
        await browser.pause(2000);
        const pwdFld = await browser.$('[data-testid="login-password-input"]');
        await pwdFld.waitForDisplayed({ timeout: 5000 });
        await pwdFld.click();
        await browser.assertView('login-password-focused', 'body');
    });
});
