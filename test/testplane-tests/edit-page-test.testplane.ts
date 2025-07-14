import {LoginPage} from "./pages/login-page";
import {EditPage} from "./pages/edit-page";

describe("Edit page", () => {

    beforeEach(async ({browser}) => {
        const loginPage = new LoginPage(browser);
        await loginPage.loginWithDefaultCredentials();
    });

    it("Should have valid expected UI", async ({browser}) => {
        const editPage = new EditPage(browser);

        await browser.openAndWait("/edit");

        expect(editPage.title).toHaveText("Edit Profile");

        await browser.assertView("default edit page", {ignoreElements: editPage.selectors.nameInput});
    });
});
