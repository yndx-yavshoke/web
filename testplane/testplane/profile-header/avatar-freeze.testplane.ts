describe('GIF s Snapshot, static', () => {
    async function authenticateUser(browser) {
        await browser.url('/');
        await browser.pause(1500);

        const avatarElem = await browser.$('[data-testid="user-avatar"]');
        const avatarHandle   = await avatarElem.isDisplayed().catch(() => false);
        if (avatarHandle) {
            await browser.pause(500);
            return;
        }

        await browser.url('/login');
        await browser.pause(2000);

        const loginField = await browser.$('[data-testid="login-email-input"]');
        const passwField  = await browser.$('[data-testid="login-password-input"]');
        const signBtn  = await browser.$('[data-testid="login-submit-button"]');

        await loginField.waitForDisplayed({ timeout: 10000 });
        await loginField.setValue('molodoy@list.ru');
        await passwField.setValue('123456');
        await signBtn.click();
        await avatarElem.waitForDisplayed({ timeout: 15000 });
        await browser.pause(1000);
    }


    async function snapshotGif(browser) {
        await browser.execute(() => {
            document
                .querySelectorAll<HTMLImageElement>('img[src*=".gif"]')
                .forEach(img => {
                    if (img.complete && img.naturalWidth > 0) {
                        const canvas = document.createElement('canvas');
                        canvas.width  = img.naturalWidth;
                        canvas.height = img.naturalHeight;
                        canvas.getContext('2d')?.drawImage(img, 0, 0);
                        img.src = canvas.toDataURL('image/png');
                    }
                });
        });
    }

    it('Log in and freeze GIF', async ({ browser }) => {
        await authenticateUser(browser);

        const avatar = await browser.$('[data-testid="user-avatar"]');
        await avatar.waitForDisplayed({ timeout: 5000 });

        await browser.pause(1500);
        await snapshotGif(browser);
        await browser.pause(500);

        await browser.assertView(
            'avatar-static-image',
            '[data-testid="user-avatar"]',
            { tolerance: 5, antialiasingTolerance: 3 }
        );
    });
});