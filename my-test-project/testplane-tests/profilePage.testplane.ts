describe('Profile page', function () {

    beforeEach(async function ({browser}) {
        await browser.url('https://yavshok.ru/login');
        await browser.$('[data-testid="login-email-input"]').setValue('abra@mail.ru');
        await browser.$('[data-testid="login-password-input"]').setValue('cadabra');
        await browser.$('[data-testid="login-submit-button"]').click();
        await browser.url('https://yavshok.ru/');
    });

    it('Without gif', async function ({browser}) {
        const logOutButton = await browser.$('[data-testid="user-logout-button"]');
        await logOutButton.waitForDisplayed({ timeout: 5000 });

        await browser.assertView('full-page', {
            ignoreElements: ['[data-testid="user-avatar"]'],
            allowViewportOverflow: true,
            compositeImage: true
        });
    });

    it('Posts displayed', async function({browser}) {
        for (let i = 0; i < 4; i++) {
            await browser.assertView(
                `post-${i}`,
                `[data-testid="gallery-item-${i}"]`,
                {
                    ignoreElements: ['img'],
                    allowViewportOverflow: true,
                    compositeImage: true
                }
            );
        }
    });

    it('Button exit displayed', async function ({browser}) {
        
        await browser.$('[data-testid="user-logout-button"]');
        await browser.assertView('logout-button', '[data-testid="user-logout-button"]');
    });

});