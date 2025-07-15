import { loginPageLocators } from '../../helpers/locators/loginPageLocators';
import { urls } from '../../helpers/urls';
import * as baseHelpers from '../../helpers/baseHelpers';

export async function login(browser: any) {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  await browser.url(urls.login);

  await baseHelpers.checkElement(browser, loginPageLocators.emailInput, 5000);
  await baseHelpers.checkElement(browser, loginPageLocators.passwordInput, 5000);
  await baseHelpers.checkElement(browser, loginPageLocators.loginButton, 5000);

  await baseHelpers.setInputValue(browser, loginPageLocators.emailInput, email, 5000);
  await baseHelpers.setInputValue(browser, loginPageLocators.passwordInput, password, 5000);
  await baseHelpers.click(browser, loginPageLocators.loginButton);
};