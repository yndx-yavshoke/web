import { Page, Locator, Route } from '@playwright/test';

export class UserProfileScreen {
    public readonly followerCount: Locator;
    public readonly emailInputHidden: Locator;
    public readonly likeCount: Locator;
    public readonly profileStatus: Locator;
    public readonly postCount: Locator;

    constructor(readonly page: Page) {
        this.followerCount = page.locator(
            '//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[2]/div[2]'
        );
        this.likeCount = page.locator(
            '//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[2]/div[3]'
        );
        this.emailInputHidden = page.getByTestId('main-email-input');
        this.postCount = page.locator(
            '//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[2]/div[1]/div[1]'
        );
        this.profileStatus = page.locator(
            '//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div[2]'
        );
    }

    async openPage() {
        await this.page.goto('/');
    }

    async statusTextYoung() {
        return await this.profileStatus.textContent();
    }

    async statusTextAdult() {
        return await this.profileStatus.textContent();
    }

    async statusTextOld() {
        return await this.profileStatus.textContent();
    }

    async getStats() {
        return {
            posts: await this.postCount.textContent(),
            subs: await this.followerCount.textContent(),
            likes: await this.likeCount.textContent()
        };
    }

    async isEmailInputVisible(): Promise<boolean> {
        return await this.emailInputHidden.isVisible();
    }

    async mockAgeCategory(mockBody: Record<string, any>) {
        await this.page.route('**/experiments', (route: Route) => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockBody),
            });
        });
    }
}
