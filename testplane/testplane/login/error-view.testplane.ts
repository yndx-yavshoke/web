describe('Sign‑In test Error', () => {
    it('Wrong data', async ({ browser }) => {
        await browser.openAndWait('/login');
        const emailFld = await browser.$('[data-testid="login-email-input"]');
        const pwdFld   = await browser.$('[data-testid="login-password-input"]');
        const btn      = await browser.$('[data-testid="login-submit-button"]');

        await emailFld.setValue('cantbeinshockshokifyesitisbad@mail.com');
        await pwdFld.setValue('veryverybadpasswordbutactuallygoodone');
        await btn.click();
        await browser.pause(1500);

        await browser.assertView('login‑error', 'body', {
            ignoreElements: ['[data-testid="login-form"]']
        });
    });
});
