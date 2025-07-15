import { LoginPage } from "./utils/LoginPage";

describe("Login page visual tests", () => {
    let loginPage: LoginPage;

    beforeEach(async ({ browser }) => {
        loginPage = new LoginPage(browser);
        await loginPage.navigateToLoginPage();
    });

    it("login in default state", async () => {
        await loginPage.assertLoginPageDefaultState();
    });

    it("login page in focus state", async () => {
        await loginPage.assertLoginPageFocusState();
    });

    it("login page in error state", async () => {
        await loginPage.assertLoginPageErrorState();
    });

    it("login email input", async () => {
        await loginPage.assertEmailInput();
    });

    it("login password input", async () => {
        await loginPage.assertPasswordInput();
    });

    it("login submit button", async () => {
        await loginPage.assertLoginSubmitButton();
    });

    it("login to register button", async () => {
        await loginPage.assertToRegisterButton();
    });

    it("login back button", async () => {
        await loginPage.assertBackButton();
    });
});
