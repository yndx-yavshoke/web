
describe('Скриншотные тесты страницы Профиля', function () {
    const config = require('../config/test-config')

    const CREDENTIALS = {
        email: 'tatiana.mantrova@gmail.com',
        password: 'qwdqwdqw'
    };

    const login = async function ({ browser }) {
        await browser.url(config.BASE_URL + 'login');

        await browser
            .$('[data-testid="login-email-input"]')
            .setValue(CREDENTIALS.email)

        await browser
            .$('[data-testid="login-password-input"]')
            .setValue(CREDENTIALS.password)

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

    it('Блок статистики профиля', async function ({ browser }) {
        await login({ browser })
        await browser.assertView(
            'user_page',
            '.css-175oi2r.r-18u37iz.r-a2tzq0',
            config.SCREENSHOT_OPTIONS
        );
    })

    it('Блок шапки профиля', async function ({ browser }) {
        await login({ browser })
        await browser.assertView(
            'user_page',
            '.css-175oi2r.r-1habvwh.r-18u37iz',
            config.SCREENSHOT_OPTIONS
        )
    })
})