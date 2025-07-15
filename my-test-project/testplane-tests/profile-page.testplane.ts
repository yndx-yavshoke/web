describe('profile page', function () {
    beforeEach(async function () {
     await this.browser.openAndWait('https://yavshok.ru/login');
     const emailInput = await this.browser.$('[data-testid="login-email-input"]');
     await emailInput.click();
     await emailInput.setValue('test123456@test.com');


    const passwordInput= await this.browser.$('[data-testid="login-password-input"]');
    await passwordInput.click();
    await passwordInput.setValue('123456');

    const loginButton = await this.browser.$('[data-testid="login-submit-button"]');
    await loginButton.click();

  });

    it('should show logout button', async ({browser}) => {

        await browser.assertView('screen logout button', '[data-testid="user-logout-button"]')
    })

    it('should show edit button', async ({browser}) => {

        await browser.assertView('screen edit button', '[data-testid="user-edit-profile-button"]')
    })

    it('should show static profile picture', async ({ browser }) => {
    await browser.execute(() => {
    const img = document.querySelector('img[src*="profile.4c9412d0fd7b6d90111faab09c8f6c4a"]');
    });

  
    await browser.assertView(
      
        'profile-picture-static',
    'img[src*="profile.4c9412d0fd7b6d90111faab09c8f6c4a"]',
    {
      screenshotDelay: 300, 
      ignoreElements: ['.loader'] 
    }
  );
});
    it('should show hard code - number of posts', async({ browser}) => {

      await browser.assertView('screen of number posts', '.css-175oi2r.r-1awozwy.r-lcslpx')

    })

})