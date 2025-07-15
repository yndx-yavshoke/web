describe('Главная страница yavshok.ru', function() {
  let emailInput: WebdriverIO.Element;
  let checkButton: WebdriverIO.Element;
  let loginButton: WebdriverIO.Element;

  let loginEmail: string;
  let noLoginEmail: string;

    beforeEach(async function ({ browser }) {
    await browser.url('/');
    emailInput = await browser.$("[data-testid='main-email-input']");
    checkButton = await browser.$("[data-testid='main-check-button']")
    loginButton = await browser.$("[data-testid='main-login-button']")

    loginEmail = "pomogaror@q.q";
    noLoginEmail = "bnbnbn@aa.ru"
  });

  it('поле ввода email', async function({ browser }) {
    await emailInput.assertView("no-focused-field");
    await emailInput.click();
    await emailInput.assertView("focused-field");
  });

  it("кнопка Я в шоке?", async function({browser}){
    await checkButton.assertView("not-enabled");
    await emailInput.setValue(noLoginEmail);
    await checkButton.assertView("enabled");
  })
});
