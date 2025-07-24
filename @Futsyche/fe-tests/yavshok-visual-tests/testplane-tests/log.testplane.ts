import { remote } from 'webdriverio';
import { LoginPage } from '../src/pages/login.testplane';
import { VisualHelper } from '../src/helpers/visual.helper';

// Указываем правильный тип для Browser
type Browser = WebdriverIO.Browser;

describe('Страница входа yavshok.ru', () => {
    let browser: Browser;
    let loginPage: LoginPage;
    let visualHelper: VisualHelper;

    beforeEach(async () => {
        // Инициализация браузера
        browser = await remote({
            capabilities: {
                browserName: 'chrome',
                'goog:chromeOptions': {
                    args: [
                        '--headless',
                        '--disable-gpu',
                        '--window-size=1280,1024',
                        '--no-sandbox'
                    ]
                }
            }
        });

        loginPage = new LoginPage(browser);
        visualHelper = new VisualHelper(browser);
    });

    describe('Дефолтное состояние', () => {
        beforeEach(async () => {
            await loginPage.open();
            await browser.pause(1000); // Пауза для стабилизации
        });

        it('отображает форму входа', async () => {
            await visualHelper.takeScreenshot('login-default');
        });
    });

    describe('Состояния фокуса', () => {
        beforeEach(async () => {
            await loginPage.open();
            await browser.pause(500);
        });

        it('фокус в поле email', async () => {
            await loginPage.focusUsername();
            await browser.pause(300);
            await visualHelper.takeScreenshot('login-focus-email');
        });

        it('фокус в поле пароля', async () => {
            await loginPage.focusPassword();
            await browser.pause(300);
            await visualHelper.takeScreenshot('login-focus-password');
        });
    });

    describe('Отправка формы', () => {
        beforeEach(async () => {
            await loginPage.open();
            await browser.pause(500);
        });

        it('успешная отправка формы', async () => {
            await loginPage.fillCredentials('qwerty@yandex.ru', '123456');
            await loginPage.submit();
            await browser.pause(1000);
            await visualHelper.takeScreenshot('login-submit');
        });
    });

    afterEach(async () => {
        if (browser) {
            await browser.deleteSession();
        }
    });
});