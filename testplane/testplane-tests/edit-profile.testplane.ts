import { LoginPage } from "./utils/LoginPage";
import { ProfilePage } from "./utils/ProfilePage";
import { EditProfilePage } from "./utils/EditProfilePage";
import { URLS, TEST_DATA, SELECTORS } from "./utils/constants";

describe("Edit Profile page visual tests", () => {
    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let editProfilePage: EditProfilePage;

    beforeEach(async ({ browser }) => {
        loginPage = new LoginPage(browser);
        profilePage = new ProfilePage(browser);
        editProfilePage = new EditProfilePage(browser);

    
        await loginPage.navigateToLoginPage();
        await loginPage.typeInElement(SELECTORS.LOGIN.EMAIL_INPUT, TEST_DATA.VALID_EMAIL);
        await loginPage.typeInElement(SELECTORS.LOGIN.PASSWORD_INPUT, TEST_DATA.VALID_PASSWORD);
        await loginPage.clickElement(SELECTORS.LOGIN.SUBMIT_BUTTON);

       
       await browser.waitUntil(
            async () => (await browser.getUrl()).includes(URLS.PROFILE),
            {
                timeout: 5000,
                timeoutMsg: 'Expected to be on profile page after 10s'
            });

        await profilePage.clickEditProfileButton();
        await editProfilePage.waitForElement(SELECTORS.EDIT_PROFILE.NAME_INPUT);
    });

    it("edit page layout", async () => {
        await editProfilePage.assertEditProfilePageLayout();
    });

    it("edit page focus layout", async () => {
        await editProfilePage.assertEditProfilePageFocusState();
    });

    it("edit page name input", async () => {
        await editProfilePage.assertNameInput();
    });

    it("should match save button", async () => {
        await editProfilePage.assertSaveButton();
    });

    it("should match cancel button", async () => {
        await editProfilePage.assertCancelButton();
    });
});
