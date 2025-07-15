import {AUTH_DATA} from "../data/auth-data";

export class LoginPage {
    private readonly browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    get loginButton() {
        return this.browser.$('[data-testid="login-submit-button"]');
    }

    get emailInput() {
        return this.browser.$('[data-testid="login-email-input"]');
    }

    get passwordInput() {
        return this.browser.$('[data-testid="login-password-input"]');
    }

    get errorMessage() {
        return this.browser.$('[class="css-146c3p1 r-howw7u r-1enofrn r-15d164r"]');
    }

    public async login({email, password}: {email: string, password: string}) {
        await this.browser.openAndWait("/login");

        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);

        await this.loginButton.click();
    }

    public async loginWithDefaultCredentials() {
        await this.login({email: AUTH_DATA.email, password: AUTH_DATA.password})
    }
}
