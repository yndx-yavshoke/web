import { Page, Locator } from '@playwright/test';

export class ShokMainPage {
    public title: Locator;
    public inputEmail: Locator;
    public inputEmailPlaceholder: Locator;
    public checkButton: Locator;
    public checkButtonText: Locator;
    public toLoginButton: Locator;
    public toLoginButtonText: Locator;
    public existingUserText: Locator;
    public existingUserGif: Locator;
    public nonExistingUserText: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', { exact: true });
        
        this.inputEmail = this.page.getByTestId('main-email-input');
        this.inputEmailPlaceholder = this.page.getByPlaceholder('Введите email', { exact: true });
        
        this.checkButton = this.page.getByTestId('main-check-button');
        this.checkButtonText = this.page.getByText('Я в шоке?', { exact: true });

        this.toLoginButton = this.page.getByTestId('main-login-button');
        this.toLoginButtonText = this.page.getByText('В шок', { exact: true });

        this.existingUserText = this.page.getByText('Ты уже в ШОКе');
        this.existingUserGif = this.page.getByRole('img');
        
        this.nonExistingUserText = this.page.getByText('Ты еще не в ШОКе');
    };

    public async open() {
        await this.page.goto('/');
    };

    public async checkEmail(email: string) {
        await this.inputEmail.fill(email);
        await this.checkButton.click();
    };

}