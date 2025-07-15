export async function login(browser: any, email: string, password: string): Promise<void> {
  await browser.url('https://yavshok.ru/login');
  await browser.$('[data-testid="login-email-input"]').setValue(email);
  await browser.$('[data-testid="login-password-input"]').setValue(password);
  await browser.$('[data-testid="login-submit-button"]').click();
  //await browser.$('[data-testid="profile-header"]').waitForDisplayed({ timeout: 5000 });
  await browser.$('[data-testid="user-avatar"]').waitForDisplayed({ timeout: 5000 });
}