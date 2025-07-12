describe('Скриншотные тесты главной страницы', function () {
    const config = require('../config/test-config')
    const reset = require('../config/reset')

    const helpers = {
        openPage: async function ({ browser }) {
            await browser.openAndWait(config.BASE_URL)
        },
        fillEmail: async function ({ email, browser }) {
            await browser.$('[data-testid="main-email-input"]').setValue(email)
        },
        clickCheckButton: async function ({ browser }) {
            await browser.$('[data-testid="main-check-button"]').click()
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

    it('Фокус на поле ввода Email', async function ({ browser }) {
        await helpers.fillEmail({ email: 'new@email.com', browser })

        await browser.assertView(
            'focused_state',
            '[data-testid="main-email-input"]',
            config.SCREENSHOT_OPTIONS
        )
    })

    it('Состояние "Ты еще не в ШОКе"', async function ({ browser }) {
        await helpers.fillEmail({ email: 'tataiana.mantrova@gmail.ru', browser })
        await helpers.clickCheckButton({ browser })

        await browser.assertView(
            'not_in_shok_state',
            'body',
            config.SCREENSHOT_OPTIONS
        )
    })
})