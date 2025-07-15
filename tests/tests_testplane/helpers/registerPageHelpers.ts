import { registerPageLocators } from '../helpers/locators/registerPageLocators';
import * as baseHelpers from './baseHelpers';

export async function register(browser: any, email: string, password: string, age: string) {
  await baseHelpers.checkElement(browser, registerPageLocators.emailInput, 5000);
  await baseHelpers.checkElement(browser, registerPageLocators.passwordInput, 5000);
  await baseHelpers.checkElement(browser, registerPageLocators.ageInput, 5000);
  await baseHelpers.checkElement(browser, registerPageLocators.registerButton, 5000);

  await baseHelpers.setInputValue(browser, registerPageLocators.emailInput, email, 5000);
  await baseHelpers.setInputValue(browser, registerPageLocators.passwordInput, password, 5000);
  await baseHelpers.setInputValue(browser, registerPageLocators.ageInput, age, 5000);
  await baseHelpers.click(browser, registerPageLocators.registerButton);
}
    