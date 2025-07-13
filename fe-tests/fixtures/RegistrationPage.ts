import type { Page, Locator} from "@playwright/test";

export class RegistrationPage {
    public title: Locator;
    public email: Locator;
    public password: Locator;
    public register: Locator;
    public return: Locator;
    public age: Locator;

    constructor(public readonly page: Page) {
        this.title = page.getByText("Регистрация в ШОКе")
        this.email = page.getByTestId("register-email-input");
        this.password = page.getByTestId("register-password-input");
        this.age = page.getByTestId("register-age-input");
        this.register = page.getByTestId("register-submit-button");
        this.return = page.getByTestId("register-back-button");
    }

    public async open() {
        await this.page.goto("/register");
    }

    public async registrate(email: string | null, password: string | null, age: string | null) {
        if (email){
            await this.email.fill(email);
        }
        if (password){
            await this.password.fill(password);
        }
        if (age){
            await this.age.fill(age);
        }
        await this.register.click();
    }

}