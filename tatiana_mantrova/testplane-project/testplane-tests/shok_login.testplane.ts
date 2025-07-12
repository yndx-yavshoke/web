describe('Скриншотные тесты страницы авторизации', function () {
    const config = require('../config/test-config')
    const reset = require('../config/reset')

    const helpers = {
        openPage: async function ({ browser }) {
            await browser.openAndWait(config.BASE_URL + 'login')
        },
        fillEmail: async function ({ email, browser }) {
            await browser.$('[data-testid="login-email-input"]').setValue(email)
        },
        fillPassword: async function ({ password, browser }) {
            await browser.$('[data-testid="login-password-input"]').setValue(password)
        },
        clickLoginButton: async function ({ browser }) {
            await browser.$('[data-testid="login-submit-button"]').click()
        }
    }

    beforeEach(async function ({ browser }) {
        await reset(browser);
        await helpers.openPage({ browser })
    })

    it('Дефолтное состояние', async function ({ browser }) {
        await browser.assertView(
            'default_state',
            'body',
            config.SCREENSHOT_OPTIONS
        )
    })

    it('Состояние ошибки ввода email или почты', async function ({ browser }) {
        await helpers.fillEmail({ email: 'newemailtestvshok@email.com', browser })
        await helpers.fillPassword({ password: '123456', browser })
        await helpers.clickLoginButton({ browser })

        await browser.assertView(
            'error_state',
            'body',
            config.SCREENSHOT_OPTIONS
        )
    })

    it('Состояние пустое поле email', async function ({ browser }) {
        await helpers.fillPassword({ password: '123456', browser })
        await helpers.clickLoginButton({ browser })

        await browser.assertView(
            'error_state',
            'body',
            config.SCREENSHOT_OPTIONS
        )
    })

    it('Состояние пустое поле пароля', async function ({ browser }) {
        await helpers.fillPassword({ password: '123456', browser })
        await helpers.clickLoginButton({ browser })

        await browser.assertView(
            'error_state',
            'body',
            config.SCREENSHOT_OPTIONS
        )
    })
})