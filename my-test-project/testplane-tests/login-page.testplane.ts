describe('login page static', function () {
  beforeEach(async function () {
     await this.browser.openAndWait('https://yavshok.ru/login');

  });

   it("should show input email", async ({browser}) => {
 
        await browser.assertView('screen input email', '[data-testid="login-email-input"]')
    })

    it("should show input password", async ({browser}) => {

        await browser.assertView('screen input password', '[data-testid="login-password-input"]')
    })

    it('should show login button', async ({browser}) => {

        await browser.assertView('screen login button', '[data-testid="login-submit-button"]')
    })

    it ('should show cancel button', async ({browser}) => {
        await browser.assertView('screen cancel button', '[data-testid="login-back-button"]')
    })

    it ('should show reg button', async ({browser}) => {
        await browser.assertView('screen reg button', '[data-testid="login-register-button"]')
    })

    it ('should show title', async ({browser}) => {
        await browser.assertView('screen title', '.css-146c3p1.r-1x35g6.r-vw2c0b')
    })

})

describe('login page focus', function () {
  beforeEach(async function () {
     await this.browser.openAndWait('https://yavshok.ru/login');

  });

  it('should highlight focused field email', async ({browser}) => {
    const emailInput = await browser.$('[data-testid="login-email-input"]');
    await emailInput.click();
    await browser.assertView('login-focus-email', '[data-testid="login-email-input"]');

  })

  it('should highlight focused field password', async ({browser}) => {
    const passwdInput = await browser.$('[data-testid="login-password-input"]');
    await passwdInput.click();
    await browser.assertView('login-focus-password', '[data-testid="login-password-input"]');

  })

})

describe('login page error', function () {
  beforeEach(async function () {
     await this.browser.openAndWait('https://yavshok.ru/login');

  });

  it('should show warn messages about empty feelds', async ({browser}) => {
        const loginButton = await browser.$('[data-testid="login-submit-button"]');
        await loginButton.click();

        await browser.assertView('warn message empty feelds', '.css-146c3p1.r-howw7u.r-1enofrn.r-15d164r');

  })

  it('should show warn messages about invalid data', async ({browser}) => {
  
        const emailInput = await browser.$('[data-testid="login-email-input"]');
        await emailInput.click();
        await emailInput.setValue('wrongexample@test.com');


        const passwordInput= await browser.$('[data-testid="login-password-input"]');
        await passwordInput.click();
        await passwordInput.setValue('sdknfjlkjsrociy76372yshjd');

        const loginButton = await browser.$('[data-testid="login-submit-button"]');
        await loginButton.click();

        await browser.assertView('warn message invalid data', '.css-146c3p1.r-howw7u.r-1enofrn.r-15d164r');

  })
  

})

