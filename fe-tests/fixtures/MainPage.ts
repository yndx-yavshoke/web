import { Page, Locator } from '@playwright/test'

export class ShockMainPage {
    public title: Locator;
    public input: Locator;
    public checkButton: Locator;
    public loginButton: Locator;
    public notYetShocked: Locator;
    public vShockeGIF: Locator;
    public vShockeText: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', { exact: true });
        this.checkButton = this.page.getByTestId('main-check-button');
        this.loginButton = this.page.getByTestId('main-login-button');
        this.input = this.page.getByTestId('main-email-input');
        this.notYetShocked = this.page.getByText('Ты еще не в ШОКе');
        this.vShockeGIF = this.page.locator('xpath=/html/body/div[1]/div/div/div/div/div/div/div/div[2]/div/img')
        this.vShockeText = this.page.getByText('Ты уже в ШОКе', { exact: true });
    }

    public async open() {
        await this.page.goto('/');
    }

    public async checkEmail(email: string) {
        await this.input.fill(email);
        await this.checkButton.click();
    }

}