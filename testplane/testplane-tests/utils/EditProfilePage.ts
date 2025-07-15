import { BasePage } from "./BasePage";
import { URLS, SELECTORS } from "./constants";

export class EditProfilePage extends BasePage {
    constructor(browser: any) {
        super(browser);
    }

    async navigateToEditProfilePage(): Promise<void> {
        await this.navigateTo(URLS.EDIT_PROFILE);
    }

    async assertEditProfilePageLayout(): Promise<void> {
        await this.assertViewPage("edit-profile-page-layout");
    }

    async assertNameInput(): Promise<void> {
        await this.assertViewElement("edit-name-input", SELECTORS.EDIT_PROFILE.NAME_INPUT);
    }

    async assertSaveButton(): Promise<void> {
        await this.assertViewElement("edit-save-button", SELECTORS.EDIT_PROFILE.SAVE_BUTTON);
    }

    async assertCancelButton(): Promise<void> {
        await this.assertViewElement("edit-cancel-button", SELECTORS.EDIT_PROFILE.CANCEL_BUTTON);
    }

    async assertEditProfilePageFocusState(): Promise<void> {
        await this.focusElement(SELECTORS.EDIT_PROFILE.NAME_INPUT);
        await this.assertViewPage("edit-profile-name-focus");
    }
}
