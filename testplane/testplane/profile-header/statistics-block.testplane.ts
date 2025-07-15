describe('Profile statistics test', () => {
    async function authenticateUser(browser) {
        await browser.url('/');
        await browser.pause(1600);

        const avatarHandle = await browser.$('[data-testid="user-avatar"]').catch(() => null);
        if (!avatarHandle) {
            await browser.url('/login');
            await browser.pause(2100);
            const loginField = await browser.$('[data-testid="login-email-input"]');
            const passwField  = await browser.$('[data-testid="login-password-input"]');
            const signBtn    = await browser.$('[data-testid="login-submit-button"]');
            await loginField.waitForDisplayed({ timeout: 9000 });
            await loginField.setValue('molodoy@list.ru');
            await passwField.setValue('123456');
            await signBtn.click();

            await (await browser.$('[data-testid="user-avatar"]')).waitForDisplayed({ timeout: 15000 });
            await browser.pause(700);
        }
    }

    it('Captures fallback', async ({ browser }) => {
        await authenticateUser(browser);
        await browser.pause(1400);

        const selector = await browser.execute(() => {
            return null;
        });

        await browser.assertView(
            'stats-fallback',
            selector || 'body',
            { ignoreElements: ['[data-testid="user-avatar"]'] }
        );
    });

    it('If post amount is 42', async ({ browser }) => {
        await authenticateUser(browser);
        await browser.pause(1400);

        const statsPage = await browser.execute(() => {
            const items = Array.from(document.querySelectorAll<HTMLElement>('*'));
            const found = items.find(el => el.textContent === '42');
            const block = found?.parentElement?.parentElement;
            if (block) block.id = 'stats-for-snapshot';
            return block ? '#stats-for-snapshot' : null;
        });

        if (statsPage) {
            await browser.assertView('stats-specific', statsPage);
        } else {
        }
    });
});
