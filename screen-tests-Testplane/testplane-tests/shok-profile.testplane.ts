import { login } from '../testplane-helpers/auth';
import { selectors } from '../testplane-helpers/selectors';

describe("Profile page", () => {
    
    beforeEach(async ({ browser }) => {
        await browser.setWindowSize(1920, 1080);

        await login(browser);
    });
    

    it("should have default page state", async ({ browser }) => {
        await browser.assertView('profile-page-default', 'body', {
            ignoreElements: [
                'div.css-146c3p1.r-vw2c0b',
                'div.css-146c3p1.r-1khnkhu',
                'img[src*="profile.4c9412d0fd7b6d90111faab09c8f6c4a.gif"]',
                'img[src*="1.270a55bb6732b03a7ba9e1b8576e334e.jpg"]',
                'img[src*="2.ac5aa59c18630318c9c527d1e6fc5664.webp"]',
                'img[src*="3.0891d9bfad47fd7792dd1328a4b9dbef.jpg"]',
                'img[src*="4.97dfdf629984d4c2f78975152341dbbe.jpg"]'
            ],
            screenshotDelay: 1000
        });
    });

    it("should display Edit button", async ({ browser }) => {
        await browser.assertView('profile-edit-button', selectors.editButton, {
            screenshotDelay: 500
        });
    });

    it("should display Logout button", async ({ browser }) => {
        await browser.assertView('profile-logout-button', selectors.logoutButton, {
            screenshotDelay: 500
        });
    });

});