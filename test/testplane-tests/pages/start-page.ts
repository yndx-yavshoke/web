import {browser} from "globals";

export class StartPage {
    private readonly browser: WebdriverIO.Browser;

    readonly selectors = {
        loginButton: '[data-testid="main-login-button"]'
    }

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    get loginButton() {
        return this.browser.$(this.selectors.loginButton);
    }
}