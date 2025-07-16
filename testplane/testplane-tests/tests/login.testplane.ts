import { SCREENSHOT_OPTS } from '../helpers/creds';
import { LoginPage } from '../pages/login.page';
import { clearStorage } from '../helpers/browser.utils';


describe('Страница авторизации', () => {
     let page: LoginPage;

     beforeEach(async function ({ browser }) {
          page = new LoginPage(browser);

          await clearStorage(browser);

          await page.open();
     });

     it('Состояние по умолчанию', async ({ browser }) => {
          await browser.assertView('default', 'body', SCREENSHOT_OPTS);
     });

     it('Фокус на поле ввода email', async ({ browser }) => {
          await page.emailInput.click();

          await browser.assertView('focus-email', 'body', SCREENSHOT_OPTS);
     });

     it('Фокус на поле ввода пароля', async ({ browser }) => {
          await page.passwordInput.click();

          await browser.assertView('focus-password', 'body', SCREENSHOT_OPTS);
     });

     it('Ошибка авторизации', async ({ browser }) => {
          await page.emailInput.setValue('wrong@mail.ru');
          await page.passwordInput.setValue('wrongpass');
          await page.submitButton.click();

          await browser.assertView('error', 'body', SCREENSHOT_OPTS);
     });
}); 