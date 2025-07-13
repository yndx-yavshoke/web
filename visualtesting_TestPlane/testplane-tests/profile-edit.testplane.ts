import * as Selectors from "../helper/selectors";
import { loginIfNeeded } from '../helper/auth';

describe("Edit Profile Visual Tests", () => {
  beforeEach(async ({ browser }) => {
    await loginIfNeeded(browser);
    await browser.openAndWait(Selectors.homeUrl);
  });

  it("default user page", async ({ browser }) => {
    await browser.$(Selectors.editBtn).waitForExist({ timeout: 5000 });
    await browser.assertView("edit-profile-default", "body");
  });

  it("after editing username", async ({ browser }) => {
    await browser.$(Selectors.editBtn).click();

    const nameInput = await browser.$(Selectors.nameIn);
    await nameInput.waitForExist({ timeout: 3000 });
    await nameInput.click();
    await nameInput.setValue("Am i Marvel");

    await browser.assertView("profile-edit-changed", "body");

    await browser.$(Selectors.saveBtn).click();
    await browser.$(Selectors.cancelBtn).waitForExist({ timeout: 2000 });
    await browser.$(Selectors.cancelBtn).click();

    await browser.assertView("profile-edit-after-cancel", "body");
  });
});
