import { Page, Locator, expect, test } from "@playwright/test";
import { ENDPOINTS } from "../constants/testData"

export class ShokMainPage{
    public title: Locator;
    public input: Locator;
    public checkButton: Locator;
    public toLoginButton: Locator;
    public inShockGif: Locator;
    public youInShokText: Locator;
    public youNotInShokText: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', {exact : true});
        this.input = this.page.getByTestId("main-email-input");
        this.checkButton = this.page.getByText('Я в шоке?', {exact : true });
        this.toLoginButton = this.page.getByText('В шок', {exact : true});
        this.inShockGif = this.page.locator('img[src*=".gif"]');
        this.youInShokText = this.page.getByText('Ты уже в ШОКе', {exact : true});
        this.youNotInShokText = this.page.getByText("Ты еще не в ШОКе", {exact : true})
    }

    public async open() {
        await this.page.goto(ENDPOINTS.enpointMain);
    }

    public async checkEmail(email: string) {
        await test.step('вставка в поле email: ' + email, async () => {
            await this.input.fill(email);
        })
        await test.step('кнопка проверить email отображается', async () => {
            await expect(this.checkButton).toBeVisible();
        })
        await test.step('нажатие на кнопку - проверить email', async () => {
            await this.checkButton.click();
        })        
    }

    public async checkEmailTrue(email: string) {
        await this.checkEmail(email)
        await test.step('Отображение анимации, что ты в шоке', async () => {
            await expect(this.inShockGif).toBeVisible();
        })
        await test.step('Отображение текста, что ты в шоке', async () => {
            await expect(this.youInShokText).toBeVisible();
        })        
    }

    public async checkEmailFalse(email: string) {
        await this.checkEmail(email)
        await test.step('Отображение текста, что ты еще не в шоке', async () => {
            await expect(this.youNotInShokText).toBeVisible();
        })           
    }
}