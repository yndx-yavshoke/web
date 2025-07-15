import { ProfilePage } from '../pages/profile.page';
import { LoginPage } from '../pages/login.page';
import { EMAIL, PASSWORD, SCREENSHOT_OPTS } from '../helpers/creds';

describe('Профиль', () => {
     let profilePage: ProfilePage;

     beforeEach(async function ({ browser }) {
          profilePage = new ProfilePage(browser);
          const loginPage = new LoginPage(browser);

          await loginPage.open();
          await loginPage.login(EMAIL, PASSWORD);

          await browser.$(profilePage.avatar).waitForExist({ timeout: 5000 });

          await browser.execute(() => {
               const avatar = document.querySelector('[data-testid="user-avatar"]');
               if (avatar && avatar instanceof HTMLElement) avatar.style.visibility = 'hidden';
          });
     });

     it('Весь header профиля', async function () {
          // await profilePage.hideGif();
          await this.browser.assertView('profile-header', await profilePage.header, SCREENSHOT_OPTS);
     });

     it('Блок статистики', async function () {
          await this.browser.assertView('profile-stats', await profilePage.stats, SCREENSHOT_OPTS);
     });

     it('Статус пользователя', async function () {
          await this.browser.assertView('profile-status', await profilePage.status, SCREENSHOT_OPTS);
     });

     it('Блок галереи', async function () {
          await this.browser.assertView('profile-gallery', await profilePage.gallery, SCREENSHOT_OPTS);
     });
}); 