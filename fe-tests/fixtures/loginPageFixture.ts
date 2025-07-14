import { Page, Locator } from '@playwright/test';


export class ShockAuth {
 public authTitle: Locator;
 public loginField: Locator;
 public accessCodeField: Locator;
 public enterBtn: Locator;
 public loginAlert: Locator;
 public passwordAlert: Locator;


 constructor(public readonly browserTab: Page) {
   this.authTitle = browserTab.getByText('Войти в ШОК', { exact: true });
   this.loginField = browserTab.getByTestId('login-email-input');
   this.accessCodeField = browserTab.getByTestId('login-password-input');
   this.enterBtn = browserTab.getByTestId('login-submit-button');
   this.loginAlert = browserTab.getByText('Введите email');
   this.passwordAlert = browserTab.getByText('Введите пароль');
 }


 public async signIn(email: string, secret: string) {
   await this.loginField.waitFor({ state: 'visible' });
   await this.loginField.fill(email);
   await this.accessCodeField.fill(secret);
   await this.enterBtn.click();
 }


 public async navigateTo() {
   await this.browserTab.goto('/login');
 }
}
