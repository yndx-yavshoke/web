import {LoginPage} from "./pages/login-page";
import {StartPage} from "./pages/start-page";
import {AUTH_DATA} from "./data/auth-data";

describe("Login page", () => {

    it("Should have valid expected UI", async ({browser}) => {
        const loginPage = new LoginPage(browser);
        const startPage = new StartPage(browser);

        await browser.url("/");

        await startPage.loginButton.click();

        await browser.assertView("default login page");

        await loginPage.emailInput.click();

        await browser.assertView("focus on email input field");

        await loginPage.passwordInput.click();

        await browser.assertView("focus on password input field");

        await loginPage.login({email: AUTH_DATA.email, password: "not-valid-password"})

        expect(loginPage.errorMessage).toHaveText(/Произошла ошибка|Неправильный логин или пароль/);
        await browser.assertView("login error");
    })
});
