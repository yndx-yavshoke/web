import { AuthPage } from "../pages/authPage";
import { ProfilePage } from "../pages/profilePage";
import { freezeGif } from "../utils/freezeGif";

describe("Страница профиля", () => {
  let profilePage: ProfilePage;

  beforeEach(async ({browser}) => {
    const authPage = new AuthPage(browser);
    await authPage.loginWithDefaultCredentials();

    profilePage = new ProfilePage(browser);
    await profilePage.logoutButton.waitForExist({ timeout: 5000 });

    await freezeGif(browser, 'img[src*="profile"]');
  });

  it("Дефолтное состояние всей страницы профиля",async ({ browser }) => {

    await browser.assertView("profile-page/default", "body", {
      disableAnimation: true,
      screenshotDelay: 300,
    });
  });

  it("Кнопка редактирования профиля", async ({ browser }) => {
    await browser.assertView("profile-edit-button/default", profilePage.selectors.editButton, {
      disableAnimation: true,
      screenshotDelay: 300,
    });
  });

  it("Кнопка выхода из профиля", async ({ browser }) => {
    await browser.assertView("profile-logout-button/default", profilePage.selectors.logoutButton, {
      disableAnimation: true,
      screenshotDelay: 300,
    });
  });

  it("Статус пользователя", async ({ browser }) => {
    await browser.assertView("profile-status/default", profilePage.selectors.status, {
      disableAnimation: true,
      screenshotDelay: 300,
    });
  });

  it("Хедер профиля", async ({ browser }) => {
    await browser.$(profilePage.selectors.header).waitForExist({ timeout: 5000 });
    await browser.assertView("profile-header/default", profilePage.selectors.header, {
      disableAnimation: true,
      screenshotDelay: 300,
    });
  });

  it("Блок статистики", async ({ browser }) => {
    await browser.assertView("profile-stats/default", profilePage.selectors.statsContainer, {
      disableAnimation: true,
      screenshotDelay: 300,
    });
  });
});
