import type { Page, Locator} from "@playwright/test";

export class LoginPage {
    public title: Locator;
    public email: Locator;
    public password: Locator;
    public registration: Locator;
    public return: Locator;
    public shok: Locator;

    constructor(public readonly page: Page) {
        this.title = page.getByText("Войти в ШОК");
        this.email = page.getByTestId("login-email-input");
        this.password = page.getByTestId("login-password-input");
        this.shok = page.getByTestId("login-submit-button");
        this.return = page.getByTestId("login-back-button");
        this.registration = page.getByTestId("login-register-button");
    }

    public async open() {
        await this.page.goto("/login");
    }

    public async login(email: string | null, password: string | null) {
        if (email){
            await this.email.fill(email);
        }
        if (password){
        await this.password.fill(password);
        }
        await this.shok.click();
    }
    
}