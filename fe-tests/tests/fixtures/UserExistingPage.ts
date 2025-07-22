import { Page, Locator, expect } from '@playwright/test';

export class UserExistingPage {
    private readonly title : Locator;
    private readonly inputEmail : Locator;
    private readonly checkButton : Locator;
    private readonly buttonLogin : Locator;
    private readonly notExistUserText : Locator;
    private readonly existUserText : Locator;
    private readonly existUserImg : Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', { exact: true });
        this.inputEmail = this.page.getByTestId('main-email-input');
        this.checkButton = this.page.getByTestId('main-check-button');
        this.buttonLogin = this.page.getByTestId('main-login-button');
        this.notExistUserText = this.page.getByText('Ты еще не в ШОКе', { exact: true });
        this.existUserText = this.page.getByText('Ты уже в ШОКе', { exact: true });
        this.existUserImg = this.page.getByRole('img');
    }

    public async Open() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL('/');
    }

    public async CheckTitle() {
        await expect(this.title).toBeVisible();
    }

    public async CheckInputEmail() {
        await expect(this.inputEmail).toBeVisible();
        await expect(this.inputEmail).toBeEmpty();
        await expect(this.inputEmail).toBeEditable();
    }

    public async CheckCheckButton() {
        await expect(this.checkButton).toBeEnabled();
    }

    public async CheckButtonLogin() {
        await expect(this.buttonLogin).toBeVisible();
        await expect(this.buttonLogin).toBeEnabled();
    }

    public async CheckUserExisting(email: string, isExist: boolean) {
        await this.inputEmail.fill(email);
        await this.checkButton.click();
        if (isExist) {
            await expect(this.existUserText).toBeVisible();
            await expect(this.existUserImg).toBeVisible();
        } else {
            await expect(this.notExistUserText).toBeVisible();
        }
    }

    public async CheckEmailValidation(email: string, isExist: boolean) {
        await this.inputEmail.fill(email);
        await this.checkButton.click();
        if (!isExist) {
        await expect(this.notExistUserText).toBeVisible();
        }
    }
};