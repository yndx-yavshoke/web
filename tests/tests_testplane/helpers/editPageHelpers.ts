import { editPageLocators } from '../helpers/locators/editPageLocators';
import * as baseHelpers from './baseHelpers';

export async function editName(browser: any, name: string, cancel: boolean) {
  await baseHelpers.checkElement(browser, editPageLocators.nameInput, 5000);
  await baseHelpers.checkElement(browser, cancel ? editPageLocators.cancelButton : editPageLocators.saveChangesButton, 5000);

  await baseHelpers.setInputValue(browser, editPageLocators.nameInput, name, 5000);
  await baseHelpers.click(browser, cancel ? editPageLocators.cancelButton : editPageLocators.saveChangesButton);
}

