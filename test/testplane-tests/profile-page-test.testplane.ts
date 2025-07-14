import {LoginPage} from "./pages/login-page";
import {ProfilePage} from "./pages/profile-page";

describe("Profile page", () => {

    beforeEach(async ({browser}) => {
        const loginPage = new LoginPage(browser);
        await loginPage.loginWithDefaultCredentials();
    });

    it("Should have valid expected UI", async ({browser}) => {
        const profilePage = new ProfilePage(browser);

        await profilePage.logoutButton.waitForExist();

        await browser.assertView("default profile page", {disableAnimation: true, ignoreDiffPixelCount: 10});

        await profilePage.editButton.waitForExist();

        await browser.assertView("header", profilePage.selectors.header, {disableAnimation: true, ignoreDiffPixelCount: 20});
        await browser.assertView("edit button", profilePage.selectors.editButton);
        await browser.assertView("logout button", profilePage.selectors.logoutButton);
        await browser.assertView("statistic data", profilePage.selectors.statistic);
        await browser.assertView("status data", profilePage.selectors.status);
    });
});