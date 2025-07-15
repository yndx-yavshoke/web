import { SCREENSHOT_OPTS } from '../helpers/creds';
import { LoginPage } from '../pages/login.page';
import { clearCookies, clearStorage } from '../helpers/browser.utils';


describe('Страница авторизации', () => {
     let page: LoginPage;

     beforeEach(async function ({ browser }) {
          page = new LoginPage(browser);

          await page.open();
     });

     it('Состояние по умолчанию', async function ({ browser }) {
          await browser.assertView('default', 'body', SCREENSHOT_OPTS);
     });

     it('Фокус на поле ввода email', async function () {
          await page.emailInput.click();

          await this.browser.assertView('focus-email', 'body', SCREENSHOT_OPTS);
     });

     it('Фокус на поле ввода пароля', async function () {
          await page.passwordInput.click();

          await this.browser.assertView('focus-password', 'body', SCREENSHOT_OPTS);
     });

     it('Ошибка авторизации', async function () {
          await page.emailInput.setValue('wrong@mail.ru');
          await page.passwordInput.setValue('wrongpass');
          await page.submitButton.click();

          await this.browser.assertView('error', 'body', SCREENSHOT_OPTS);
     });
}); 