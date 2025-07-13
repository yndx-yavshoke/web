import { Page, Locator } from '@playwright/test';

export class UserLoginScreen {
    public readonly enterBtn: Locator;
    public readonly missingEmail: Locator;
    public readonly missingPassword: Locator;
    public readonly registerAgeField: Locator;
    public readonly registerBtn: Locator;
    public readonly signOutBtn: Locator;
    public readonly loginErrorMsg: Locator;
    public readonly switchToRegister: Locator;
    public readonly registerMail: Locator;
    public readonly registerPass: Locator;
    public readonly passField: Locator;
    public readonly emailField: Locator;

    constructor(public page: Page) {
        this.loginErrorMsg = page.getByText('Неправильный логин или пароль');
        this.registerMail = page.getByTestId('register-email-input');
        this.registerPass = page.getByTestId('register-password-input');
        this.registerAgeField = page.getByTestId('register-age-input');
        this.emailField = page.getByTestId('login-email-input');
        this.enterBtn = page.getByTestId('login-submit-button');
        this.missingEmail = page.getByText('Введите email');
        this.signOutBtn = page.getByTestId('user-logout-button');
        this.registerBtn = page.getByTestId('register-submit-button');
        this.missingPassword = page.getByText('Введите пароль');
        this.switchToRegister = page.getByTestId('login-register-button');
        this.passField = page.getByTestId('login-password-input');
    }

    async loginWith(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passField.fill(password);
        await this.enterBtn.click();
    }

    async navigate() {
        await this.page.goto('/login');
    }

    async signupUser() {
        const randomEmail = `user_${Math.random().toString(36).substring(2, 10)}_${Date.now()}@example.com`;
        const passwordChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let randomPassword = '';
        for (let i = 0; i < 12; i++) {
            randomPassword += passwordChars.charAt(Math.floor(Math.random() * passwordChars.length));
        }
        const randomAge = String(Math.floor(Math.random() * 100));
        const newUser = {
            email: randomEmail,
            password: randomPassword,
            age: randomAge,
        }

        return newUser;
    }

    async fillRegisterForm(user: { email: string, password: string, age: string }) {
        await this.registerMail.waitFor({ state: 'visible' });
        await this.registerMail.fill(user.email);

        await this.registerPass.waitFor({ state: 'visible' });
        await this.registerPass.fill(user.password);

        await this.registerAgeField.waitFor({ state: 'visible' });
        await this.registerAgeField.fill(user.age);

        await this.registerBtn.waitFor({ state: 'visible' });
        await this.registerBtn.click();
    }
}
