import mockResponse from './mocks/login_mock.json'
require('dotenv').config();


describe("Profile page tests", () => {
    beforeEach(async function() {
        await this.browser.openAndWait("/login");
        await this.browser.$('[data-testid="login-email-input"]').setValue(process.env.TEST_EMAIL!);
        await this.browser.$('[data-testid="login-password-input"]').setValue(process.env.TEST_PASSWORD!);
        await this.browser.$('[data-testid="login-submit-button"]').click();
    });


    it("Check default on Profile page", async ({browser}) => {
        await browser.assertView(
            'profile_default',
            'body', //'//div[@data-testid="user-avatar"]/../../..',
            { 
                ignoreElements: [
                    '//div[@data-testid="user-avatar"]', // Avatar
                    '//div[@data-testid="user-edit-profile-button"]/../div[1]', // Name
                    '//div[@data-testid="user-edit-profile-button"]/../div[2]', // Status
                    '//div[@data-testid="gallery-image-0"]', // Picture 1
                    '//div[@data-testid="gallery-image-1"]', // Picture 2
                    '//div[@data-testid="gallery-image-2"]', // Picture 3
                    '//div[@data-testid="gallery-image-3"]', // Picture 4
                ],
                screenshotDelay: 1000,
            }
        );
    });


    it("Check user avatar on Profile page", async ({browser}) => {
        await browser.execute(() => {
            const style = document.createElement('style');
            style.innerHTML = 'img[src*=".gif"] { animation: none !important; }';
            document.head.appendChild(style);
        });
        
        await browser.assertView("profile_avatar", '[data-testid="user-avatar"]', {
            disableAnimation: true,
            tolerance: 5,
            antialiasingTolerance: 3
        });
    });


    it("Check name and status of user from mock on Profile page", async ({browser}) => {

        const mock = await browser.mock("https://api.yavshok.ru/**", {
            method: "post",
        });
        mock.respond(mockResponse);

        await browser.openAndWait("/login");
        await browser.$('[data-testid="login-email-input"]').setValue(process.env.TEST_EMAIL!);
        await browser.$('[data-testid="login-password-input"]').setValue(process.env.TEST_PASSWORD!);
        await browser.$('[data-testid="login-submit-button"]').click()

        await browser.assertView("profile_header", '//div[@data-testid="user-edit-profile-button"]/..', {screenshotDelay: 1000});
    });

});
