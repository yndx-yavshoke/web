export const LOGIN_URL = '/login';

export class LoginPage {
     constructor(private browser: any) {
          this.browser = browser;
     }

     get emailInput() {
          return this.browser.$('[data-testid="login-email-input"]');
     }

     get passwordInput() {
          return this.browser.$('[data-testid="login-password-input"]');
     }

     get submitButton() {
          return this.browser.$('[data-testid="login-submit-button"]');
     }

     async open() {
          await this.browser.url(LOGIN_URL);
     }

     async login(email: string, password: string) {
          await this.emailInput.setValue(email);
          await this.passwordInput.setValue(password);

          await this.submitButton.click();
     }
} 