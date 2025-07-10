import { Page, Locator } from "@playwright/test";


export class ShokRegisterPage {
    public title: Locator;
    public email: Locator;
    public password: Locator;
    public age: Locator;
    public registerButton: Locator;
    public backButton: Locator;

    public userAvatar: Locator;
    public userName: Locator;
    public missingPasswordReaction: Locator;
    public missingEmailReaction: Locator;
    public missingAgeReaction: Locator;
    public wrongEmailReaction: Locator;
    public shortPasswordReaction: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText("Регистрация в ШОКе", {exact: true});
        this.email = this.page.getByTestId("register-email-input");
        this.password = this.page.getByTestId("register-password-input");
        this.age = this.page.getByTestId("register-age-input");
        this.registerButton = this.page.getByTestId("register-submit-button");
        this.backButton = this.page.getByTestId("register-back-button");

        this.userAvatar = this.page.getByTestId("user-avatar");
        this.userName = this.page.getByText("Neko", {exact: true});
        this.missingPasswordReaction = this.page.getByText("Введите пароль", { exact: true });
        this.missingEmailReaction = this.page.getByText("Введите email", { exact: true });
        this.missingAgeReaction = this.page.getByText("Введите возраст", { exact: true });
        this.wrongEmailReaction = this.page.getByText("Неправильный email-адрес", { exact: true });
        this.shortPasswordReaction = this.page.getByText("Пароль должен содержать минимум 6 символов", { exact: true });
    }

    public async open() {
        await this.page.goto('/register');
    }
    
    public async registerUser(email: string, password: string, age: string) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.age.fill(age);
        await this.registerButton.click();
    }

    public async goToBackPage() {
        await this.backButton.click();
    }
}