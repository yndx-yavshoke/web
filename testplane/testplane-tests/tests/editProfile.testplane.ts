import { AuthPage } from "../pages/authPage";
import { EditProfilePage } from "../pages/editProfilePage";

describe("Страница редактирования профиля", () => {
    let editProfilePage: EditProfilePage;

    beforeEach(async ({browser}) => {
        const authPage = new AuthPage(browser);
        await authPage.loginWithDefaultCredentials();

        editProfilePage = new EditProfilePage(browser);
        await browser.openAndWait("/edit");

        await (await editProfilePage.title).waitForExist({ timeout: 5000 });

    });

    it('Дефолтное состояние страницы редактирования', async function () {
    await this.browser.assertView('edit-profile/default', 'body', {
      disableAnimation: true,
      screenshotDelay: 300,
    });
  });

  it('Поле имени', async function () {
    await this.browser.assertView('edit-profile/name-input', editProfilePage.selectors.nameInput, {
      disableAnimation: true,
      screenshotDelay: 300,
    });
  });
});