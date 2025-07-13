import { loginUser, logoutUser } from "./utils";

// Названия для assertView
const profileUserAvatarView = "profile-user-avatar";
const profileEditUserButtonView = "profile-edit-user-button";
const profileLogoutButtonView = "profile-logout-button";
const profileStatsView = "profile-stats";
const profileUserInfoView = "profile-user-info";
// Селекторы
const userAvatarSelector = 'img[src*=".gif"]';
const editProfileButtonSelector = '[data-testid="user-edit-profile-button"]';
const logoutButtonSelector = '[data-testid="user-logout-button"]';
const profileStatsSelector = '.r-156q2ks';
const userInfoSelector = '.css-175oi2r.r-1joea0r';


describe("Проверка страницы пользователя", () => {

    beforeEach(async function () {
        await loginUser(this.browser);
        await this.browser.openAndWait("", {
            waitNetworkIdle: true,
            waitNetworkIdleTimeout: 500,
            timeout: 5000
        });
    });

    afterEach(async function () {
        await logoutUser(this.browser);
    });

    it("Аватар пользователя", async ({ browser }) => {

        await browser.assertView(profileUserAvatarView, userAvatarSelector, {
            disableAnimation: true,
            screenshotDelay: 500,
            tolerance: 10, // чувствительность к цвету, чем выше — тем больше "терпит" разницу
            antialiasingTolerance: 10, // терпимость к сглаживанию
            ignoreDiffPixelCount: '5%', // допустимо до 1% отличающихся пикселей
        });
    });

    it("Кнопка редактирования профиля", async ({ browser }) => {
        await browser.assertView(profileEditUserButtonView, editProfileButtonSelector);
    });

    it("Кнопка выхода", async ({ browser }) => {
        await browser.assertView(profileLogoutButtonView, logoutButtonSelector);
    });

    it("Блок с постами/лайками", async ({ browser }) => {
        await browser.assertView(profileStatsView, profileStatsSelector);
    });

    it("Информация о пользователе (имя, статус)", async ({ browser }) => {
        await browser.assertView(profileUserInfoView, userInfoSelector);
    });
});
