describe('Редактирование профиля', function () {
    const config = require('../config/test-config')

    const login = async function ({ browser }) {
        await browser.url(config.BASE_URL + 'login')

        await browser
            .$('[data-testid="login-email-input"]')
            .setValue(config.MY_CREDENTIALS.email)

        await browser
            .$('[data-testid="login-password-input"]')
            .setValue(config.MY_CREDENTIALS.password)

        await browser
            .$('[data-testid="login-submit-button"]')
            .click()

        await browser.waitUntil(
            async () => {
                const url = await browser.getUrl();
                return url.includes('/');
            },
            {
                timeout: 5000,
                timeoutMsg: 'Не удалось авторизоваться в течение 5 секунд'
            }
        )
    }

    beforeEach(async function ({ browser }) {
        await login({ browser })
        await browser
            .$('[data-testid="user-edit-profile-button"]')
            .click()
    })

    it('Страница редактирования профиля', async function ({ browser }) {
        await browser.assertView(
            'edit_profile_page',
            'body',
            config.SCREENSHOT_OPTIONS
        )
    })
})