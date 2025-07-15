import { LoginPage } from "./utils/LoginPage";
import { ProfilePage } from "./utils/ProfilePage";
import { URLS, TEST_DATA, SELECTORS } from "./utils/constants";

describe("Profile page visual tests", () => {
    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    beforeEach(async ({ browser }) => {
        loginPage = new LoginPage(browser);
        profilePage = new ProfilePage(browser);

        await loginPage.navigateToLoginPage();
        await loginPage.typeInElement(SELECTORS.LOGIN.EMAIL_INPUT, TEST_DATA.VALID_EMAIL);
        await loginPage.typeInElement(SELECTORS.LOGIN.PASSWORD_INPUT, TEST_DATA.VALID_PASSWORD);
        await loginPage.clickElement(SELECTORS.LOGIN.SUBMIT_BUTTON);

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(URLS.PROFILE),
            {
                timeout: 5000,
                timeoutMsg: 'Expected to be on profile page after 5s'
            }
        );
    });

    it("profile layout", async () => {
        await profilePage.stabilizeAvatarGif();
        await profilePage.assertProfilePageLayout();
        
    });

    it("profile logout button", async () => {
        await profilePage.assertLogoutButton();
    });

    it("profile edit button", async () => {
        await profilePage.assertEditButton();
    });

    it("profile avatar", async () => {
        await profilePage.stabilizeAvatarGif();
        await profilePage.assertAvatar();
    });


})
