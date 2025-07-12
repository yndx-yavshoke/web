import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly submitButton: Locator;
  readonly backButton: Locator;
  readonly registrButton:Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginEmail = page.getByTestId('login-email-input');
    this.loginPassword = page.getByTestId('login-password-input');
    this.submitButton = page.getByTestId('login-submit-button').getByText('В шок');
    this.backButton = page.getByTestId('login-back-button');
    this.registrButton = page.getByTestId("login-register-button");


  }

  async open(path: string) {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle'); 
  }

  async checkLoginEmail() {
    await expect(this.loginEmail).toBeVisible();
  }

  async checkLoginPassword() {
    await expect(this.loginPassword).toBeVisible();
  }

  async checkSubmitButton() {
    await expect(this.submitButton).toBeVisible();
  }

  async checkBackButton() {
    await expect(this.backButton).toBeVisible();
  }
  async checkLoginRegistrButton(){
    await expect (this.registrButton).toBeVisible();
  }
}