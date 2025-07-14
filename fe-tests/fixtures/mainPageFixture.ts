import { Page, Locator } from '@playwright/test';


export class ShockLanding {
 public header: Locator;
 public emailField: Locator;
 public verifyBtn: Locator;
 public authRedirect: Locator;
 public notMemberLabel: Locator;
 public memberLabel: Locator;
 public cheerfulPet: Locator;


 constructor(public readonly browserTab: Page) {
   this.header = this.browserTab.getByText('Я в ШОКе', { exact: true });
   this.emailField = this.browserTab.getByTestId('main-email-input');
   this.verifyBtn = this.browserTab.getByTestId('main-check-button');
   this.authRedirect = this.browserTab.getByTestId('main-login-button');
   this.notMemberLabel = this.browserTab.getByText('Ты еще не в ШОКе', { exact: true });
   this.memberLabel = this.browserTab.getByText('Ты уже в ШОКе', { exact: true });
   this.cheerfulPet = this.browserTab.locator('img[src*="happyCat"]');
 }


 public async navigate() {
   await this.browserTab.goto('/');
 }


 public async verifyUser(email: string) {
   await this.emailField.fill(email);
   await this.verifyBtn.click();
 }
}
