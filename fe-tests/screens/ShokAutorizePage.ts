import { Page, Locator, expect, test} from "@playwright/test"
import { ENDPOINTS } from "../constants/testData"

export class ShokAutorizePage{
    public title: Locator;
    public inputEmail: Locator;
    public inputPassword: Locator;
    public buttonEnter: Locator;
    public buttonBack: Locator;
    public buttonRegistration: Locator;
    public lineErrorEnter: Locator;
    public lineErrorEmail: Locator;
    public lineErrorPassword: Locator;
    public lineError: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText("Войти в ШОК", {exact : true});
        this.inputEmail = this.page.getByTestId('login-email-input');
        this.inputPassword = this.page.getByTestId('login-password-input');
        this.buttonEnter = this.page.getByTestId('login-submit-button');
        this.buttonBack = this.page.getByTestId('login-back-button');
        this.buttonRegistration = this.page.getByTestId('login-register-button');
        this.lineErrorEnter = this.page.getByText("Неправильный логин или пароль", {exact : true});
        this.lineErrorEmail = this.page.getByText("Введите email", {exact : true});
        this.lineErrorPassword = this.page.getByText("Введите пароль", { exact : true});
        this.lineError = this.page.getByText("Произошла ошибка", {exact: true});
    }

    public async open(){
        await this.page.goto(ENDPOINTS.endpointLogin, {timeout : 45000});
    }

    public async logIn(email: string, password: string){
        await test.step('Поле ввода email отоброжается', async () => {
            await expect(this.inputEmail).toBeVisible();
        })
        await test.step('Ввод в поле email: ' + email , async () => {
            await this.inputEmail.fill(email, {timeout : 15000});
        })
        await test.step('Табуляция между строками ввода', async () => {
            await this.inputEmail.press('Tab');
        })
        await test.step('Ввод в поле пароля: ' + password, async () => {
            await this.inputPassword.fill(password, {timeout : 15000});
        })
        await test.step('Табуляция между строками ввода', async () => {
            await this.inputPassword.press('Tab');
        })
        await test.step('Кнопка входа отоброжается', async () => {
            await expect(this.buttonEnter).toBeVisible();
        })
        await test.step("Нажатие на кнопку входа", async () => {
            await this.buttonEnter.click({timeout : 15000});
        })        
    }
}
