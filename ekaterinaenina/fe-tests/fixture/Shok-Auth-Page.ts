import { Page, Locator } from "@playwright/test";


export class ShokAuthPage {
    public title: Locator;
    public email: Locator;
    public password: Locator;
    public loginButton: Locator;
    public backButton: Locator;
    public registerButton: Locator;

    public shokTitle: Locator;
    public userAvatar: Locator;
    public unRegisterUserReaction: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText("Войти в ШОК", {exact: true});
        this.email = this.page.getByTestId("login-email-input");
        this.password = this.page.getByTestId("login-password-input");
        this.loginButton = this.page.getByTestId("login-submit-button");
        this.backButton = this.page.getByTestId("login-back-button");
        this.registerButton = this.page.getByTestId("login-register-button");

        this.shokTitle = this.page.getByText("Я в ШОКе", {exact: true});
        this.userAvatar = this.page.getByTestId("user-avatar");
        this.unRegisterUserReaction = this.page.getByText("Неправильный логин или пароль", { exact: true });
    }

    public async open() {
        await this.page.goto('/login');
    }

    public async autorizeUser(email: string, password: string) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    public async goToBackPage() {
        await this.backButton.click();
    }

    public async goToRegisterPage() {
        await this.registerButton.click();
    }
}