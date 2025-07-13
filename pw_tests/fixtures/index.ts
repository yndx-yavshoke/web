import { test as base } from "@playwright/test";
import { HomeShokPage } from "./HomeShokPage";
import { CheckShokWidget } from "./CheckShokWidget";
import { UserLoginScreen } from "./UserLoginScreen";
import { UserProfileScreen } from "./UserProfileScreen";

type KitFixtures = {
    landing: HomeShokPage;
    shokChecker: CheckShokWidget;
    profile: UserProfileScreen;
    authPage: UserLoginScreen;
};

export const test = base.extend<KitFixtures>({
    landing: async ({ page }, use) => {
        const landing = new HomeShokPage(page);
        await use(landing);
    },
    authPage: async ({ page }, use) => {
        const login = new UserLoginScreen(page);
        await use(login);
    },
    profile: async ({ page }, use) => {
        const profile = new UserProfileScreen(page);
        await use(profile);
    },
    shokChecker: async ({ page }, use) => {
        const checker = new CheckShokWidget(page);
        await use(checker);
    },
});