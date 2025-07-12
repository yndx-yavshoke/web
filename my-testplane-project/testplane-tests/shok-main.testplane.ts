import { MainPage } from '../fixtures/MainPage';

describe('Главная страница', () => {
  beforeEach(async function () {
    await this.browser.reloadSession();
    await this.browser.url('https://yavshok.ru');
  });

  it('Дефолтное состояние главной страницы', async function () {
    const page = new MainPage(this.browser);
    await page.open();
    await (await page.emailInput).waitForDisplayed();
    await (await page.checkButton).waitForDisplayed();
    await (await page.loginButton).waitForDisplayed();

    await this.browser.assertView('main-default', '#root div.css-175oi2r', {
      compositeImage: true,
    });
  });

  it('Фокус на поле Email', async function () {
    const page = new MainPage(this.browser);
    await page.open();
    const emailInput = await page.emailInput;
    await emailInput.waitForDisplayed();
    await emailInput.click();

    await this.browser.assertView('main-email-focused', '#root div.css-175oi2r', {
      compositeImage: true,
    });
  });

  it('Состояние после проверки зарегистрированного email', async function () {
    const page = new MainPage(this.browser);
    await page.open();
    await page.checkEmail('cat1@ya.ru');
    const successText = await page.inShokText;
    await successText.waitForDisplayed();

    await this.browser.pause(5000);
    await this.browser.assertView('registered-email-stable', 'body', {
      compositeImage: true,
      disableAnimation: true,
      ignoreElements: ['img[src$=".gif"]', 'div[style*="rotate"]', 'div[style*="translate"]'],
      ignoreDiffPixelCount: `${0.2}%`,
    });
  });

  it('Состояние после проверки незарегистрированного email', async function () {
    const page = new MainPage(this.browser);
    await page.open();
    await page.checkEmail('notcat1@ya.ru');
    const notInShockText = await page.notInShokText;
    await notInShockText.waitForDisplayed();

    await this.browser.assertView('unregistered-email-check', '#root div.css-175oi2r', {
      compositeImage: true,
    });
  });
});
