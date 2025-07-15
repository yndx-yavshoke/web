import { ProfileEditPage } from '../pages/profile-edit.page';
import { LoginPage } from '../pages/login.page';
import { EMAIL, PASSWORD, SCREENSHOT_OPTS } from '../helpers/creds';


describe('Редактирование профиля', () => {
     let page: ProfileEditPage;

     beforeEach(async function ({ browser }) {
          page = new ProfileEditPage(browser);
          const loginPage = new LoginPage(browser);
          await loginPage.open();

          await loginPage.login(EMAIL, PASSWORD);

          await page.open();
     });

     it('Дефолтное состояние', async function () {
          await this.browser.assertView('edit-default', 'body', SCREENSHOT_OPTS);
     });

     it('Фокус на поле имени', async function () {
          await page.nameInput.click();

          await this.browser.assertView('focus-name', 'body', SCREENSHOT_OPTS);
     });

     it('Ошибка валидации (пустое имя)', async function () {
          await page.setName('');
          await page.save();

          await this.browser.assertView('validation-error', 'body', SCREENSHOT_OPTS);
     });

     it('Успешное сохранение', async function () {
          await page.setName('Larry Test');
          await page.save();

          await this.browser.assertView('success', 'body', SCREENSHOT_OPTS);
     });
}); 