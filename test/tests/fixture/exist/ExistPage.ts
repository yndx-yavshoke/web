import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class ExistPage {
    public title: Locator;
    public emailInput: Locator;
    public checkButton: Locator;
    public loginButton: Locator;
    public notExistTitle: Locator;
    public existsTitle: Locator;
    public image: Locator;
    public URL: String;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', { exact: true });
        this.emailInput = this.page.getByTestId('main-email-input');
        this.checkButton = this.page.getByTestId('main-check-button');
        this.loginButton = this.page.getByTestId('main-login-button');
        this.notExistTitle = this.page.getByText('Ты еще не в ШОКе');
        this.existsTitle = this.page.getByText('Ты уже в ШОКе');
        this.image = this.page.locator('//*[@id="root"]/div/div/div[5]/div/div/div/div/div[2]/div/img')
        this.URL = this.page.url();
    }
}
