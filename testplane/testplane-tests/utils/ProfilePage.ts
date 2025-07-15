import { BasePage } from "./BasePage";
import { URLS, SELECTORS } from "./constants";

export class ProfilePage extends BasePage {
    constructor(browser: any) {
        super(browser);
    }

    async navigateToProfilePage(): Promise<void> {
        await this.navigateTo(URLS.PROFILE);
    }

    async clickEditProfileButton(): Promise<void> {
        await this.clickElement(SELECTORS.PROFILE.EDIT_PROFILE_BUTTON);
    }

    async stabilizeAvatarGif(): Promise<void> {
        await this.stabilizeGif(SELECTORS.PROFILE.AVATAR);
    }

    async assertProfilePageLayout(): Promise<void> {
        await this.assertViewPage("profile-page-layout");
    }

    async assertLogoutButton(): Promise<void> {
        await this.assertViewElement("profile-logout-button", SELECTORS.PROFILE.LOGOUT_BUTTON);
    }

    async assertEditButton(): Promise<void> {
        await this.assertViewElement("profile-edit-button", SELECTORS.PROFILE.EDIT_PROFILE_BUTTON);
    }

    async assertAvatar(): Promise<void> {
        await this.assertViewElement("profile-avatar", SELECTORS.PROFILE.AVATAR);
    }
}


