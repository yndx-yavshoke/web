import { Page, Locator } from '@playwright/test';


const randomUserAge = Math.floor(Math.random() * 100);


export class ShockRegistration {
 public formHeader: Locator;
 public emailInput: Locator;
 public secretCodeInput: Locator;
 public ageInput: Locator;
 public submitBtn: Locator;
 public returnBtn: Locator;
 public emailErrorMsg: Locator;
 public passwordErrorMsg: Locator;
 public ageErrorMsg: Locator;


 constructor(public readonly browserTab: Page) {
   this.formHeader = browserTab.getByText('Регистрация в ШОКе', { exact: true });
   this.emailInput = browserTab.getByTestId('register-email-input');
   this.secretCodeInput = browserTab.getByTestId('register-password-input');
   this.ageInput = browserTab.getByTestId('register-age-input');
   this.submitBtn = browserTab.getByTestId('register-submit-button');
   this.returnBtn = browserTab.getByTestId('register-back-button');
   this.emailErrorMsg = browserTab.getByText('Введите email', { exact: true });
   this.passwordErrorMsg = browserTab.getByText('Введите пароль', { exact: true });
   this.ageErrorMsg = browserTab.getByText('Введите возраст', { exact: true });
 }


 public async navigateTo() {
   await this.browserTab.goto('/register');
   await this.formHeader.waitFor({ state: 'visible' });
 }


 public async goBack() {
   await this.returnBtn.click();
 }


 public async completeRegistration(userEmail: string, userPassword: string, userAge: string) {
   await this.emailInput.fill(userEmail);
   await this.secretCodeInput.fill(userPassword);
   await this.ageInput.fill(userAge);
   await this.submitBtn.click();
 }
}
