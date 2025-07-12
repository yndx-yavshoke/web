export async function login(browser, email, password) {
  await browser.url('https://yavshok.ru/login');
  const emailInput = await browser.$('[data-testid="login-email-input"]');
  const passwordInput = await browser.$('[data-testid="login-password-input"]');
  const loginButton = await browser.$('[data-testid="login-submit-button"]');
  await emailInput.setValue(email);
  await passwordInput.setValue(password);
  await loginButton.click();
}
