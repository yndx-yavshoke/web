import { BasePage } from "./BasePage";
import { URLS, SELECTORS, TEST_DATA } from "./constants";

export class LoginPage extends BasePage {
    constructor(browser: any) {
        super(browser);
    }

    async navigateToLoginPage(): Promise<void> {
        await this.navigateTo(URLS.LOGIN);
    }

    async login(email: string, password: string): Promise<void> {
        await this.typeInElement(SELECTORS.LOGIN.EMAIL_INPUT, email);
        await this.typeInElement(SELECTORS.LOGIN.PASSWORD_INPUT, password);
        await this.clickElement(SELECTORS.LOGIN.SUBMIT_BUTTON);
    }

    async assertLoginPageDefaultState(): Promise<void> {
        await this.assertViewPage("login-page-default");
    }

    async assertLoginPageFocusState(): Promise<void> {
        await this.focusElement(SELECTORS.LOGIN.EMAIL_INPUT);
        await this.assertViewPage("login-page-email-focus");
        await this.focusElement(SELECTORS.LOGIN.PASSWORD_INPUT);
        await this.assertViewPage("login-page-password-focus");
    }

    async assertLoginPageErrorState(): Promise<void> {
        await this.login(TEST_DATA.INVALID_EMAIL, TEST_DATA.INVALID_PASSWORD);
        await this.assertViewPage("login-page-error");
    }

    async assertEmailInput(): Promise<void> {
        await this.assertViewElement("login-email-input", SELECTORS.LOGIN.EMAIL_INPUT);
    }

    async assertPasswordInput(): Promise<void> {
        await this.assertViewElement("login-password-input", SELECTORS.LOGIN.PASSWORD_INPUT);
    }

    async assertLoginSubmitButton(): Promise<void> {
        await this.assertViewElement("login-submit-button", SELECTORS.LOGIN.SUBMIT_BUTTON);
    }

    async assertToRegisterButton(): Promise<void> {
        await this.assertViewElement("login-register-button", SELECTORS.LOGIN.REGISTER_BUTTON);
    }

    async assertBackButton(): Promise<void> {
        await this.assertViewElement("login-back-button", SELECTORS.LOGIN.BACK_BUTTON);
    }
}
