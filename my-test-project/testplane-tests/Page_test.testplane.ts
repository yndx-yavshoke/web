// Перед запуском тестов:
// 1) nvm install 22  
// 2) npx testplane gui

// Авторизация
import { login } from './auth';
describe("Страница входа в ШОК", function() {
    beforeEach(async function() {
        await this.browser.url("https://yavshok.ru/login");
        await this.browser.$('[data-testid="login-email-input"]').waitForDisplayed();
    });

    it("Дефолтное сосотояние страницы входа", async function() {
  
        // Скриншот страницы
        await this.browser.assertView(
            "login-page",
            {
                screenshotDelay: 1000
            }
        );
    });

    it("Фокус на поле email", async function() {

        // Загрузка страницы
        const emailInput = await this.browser.$('[data-testid="login-email-input"]');
        await emailInput.click();
        await this.browser.pause(500);

        const isFocused = await emailInput.isFocused();
        if (!isFocused) {
            throw new Error("Нажмите на поле 'email'!");
        }
        
        // Скриншот страницы
        await this.browser.assertView(
            "login-page-email-focused",
            {
                screenshotDelay: 1000,
                tolerance: 5
            }
        );
    });

    it("Фокус на поле пароля", async function() {

        // Загрузка страницы
        const passwordInput = await this.browser.$('[data-testid="login-password-input"]');
        await passwordInput.click();
        await this.browser.pause(500);

        const isFocused = await passwordInput.isFocused();
        if (!isFocused) {
            throw new Error("Нажмите на поле 'пароль'!");
        }
        
        // Скриншот страницы
        await this.browser.assertView(
            "login-page-password-focused",
            {
                screenshotDelay: 1000,
                tolerance: 5
            }
        );
    });

    it("Неправильный логин или пароль", async function() {
        const emailInput = await this.browser.$('[data-testid="login-email-input"]');
        const passwordInput = await this.browser.$('[data-testid="login-password-input"]');
        const submitButton = await this.browser.$('[data-testid="login-submit-button"]');

        // Ввод данных 
        await emailInput.setValue("wrong@example.com");
        await passwordInput.setValue("invalidpassword");
        await submitButton.click();

        const errorElement = await this.browser.$('[class="css-146c3p1 r-howw7u r-1enofrn r-15d164r"]');
        await errorElement.waitForDisplayed({ timeout: 3000 });

        // Ожидание сообщения об ошибке
        const errorText = await errorElement.getText();
        expect(errorText).toMatch(/Неправильный логин или пароль/i);

        // Скриншот ошибки
        await this.browser.assertView(
            "login-error-invalid-credentials",
            '[class="css-146c3p1 r-howw7u r-1enofrn r-15d164r"]',
            { screenshotDelay: 1000 }
        );
    });

    it("Попытка входа без пароля", async function() {
        const emailInput = await this.browser.$('[data-testid="login-email-input"]');
        const submitButton = await this.browser.$('[data-testid="login-submit-button"]');

        // Ввод данных 
        await emailInput.setValue("wrong@example.com");
        await submitButton.click();

        const errorElement = await this.browser.$('[class="css-146c3p1 r-howw7u r-1enofrn r-15d164r"]');
        await errorElement.waitForDisplayed({ timeout: 3000 });

        // Ожидание сообщения об ошибке
        const errorText = await errorElement.getText();
        expect(errorText).toMatch(/Введите пароль/i);

        // Скриншот ошибки
        await this.browser.assertView(
            "login-error-invalid-credentials",
            '[class="css-146c3p1 r-howw7u r-1enofrn r-15d164r"]',
            { screenshotDelay: 1000 }
        );
    });

    it("Попытка входа без email", async function() {
        const passwordInput = await this.browser.$('[data-testid="login-password-input"]');
        const submitButton = await this.browser.$('[data-testid="login-submit-button"]');

        // Ввод данных 
        await passwordInput.setValue("invalidpassword");
        await submitButton.click();

        const errorElement = await this.browser.$('[class="css-146c3p1 r-howw7u r-1enofrn r-15d164r"]');
        await errorElement.waitForDisplayed({ timeout: 3000 });

        // Ожидание сообщения об ошибке
        const errorText = await errorElement.getText();
        expect(errorText).toMatch(/Введите email/i);

        // Скриншот ошибки
        await this.browser.assertView(
            "login-error-invalid-credentials",
            '[class="css-146c3p1 r-howw7u r-1enofrn r-15d164r"]',
            { screenshotDelay: 1000 }
        );
    });
});

describe('Шапка профиля', function() {

    // Авторизация
    beforeEach(async function() {
        await login(this.browser, {
            email: 'example@domen.ru', 
            password: '12345678'
        });
        await this.browser.pause(500);
    });

    // Стабилизация гифки
    it('Основная структура шапки', async function() {
        

        await this.browser.assertView(
            '[class = "css-175oi2r r-18u37iz r-a2tzq0 r-156q2ks r-15m1z73 r-u9wvl5"]',
            '[class = "css-175oi2r r-1joea0r"]',


            {
                disableAnimation: true, 
                screenshotDelay: 3000,  
                tolerance: 5, 
                ignoreElements: [
                    'css-146c3p1 r-1khnkhu r-15d164r r-ubezar', // Игнорируем статус
                    'css-146c3p1 r-vw2c0b r-15zivkp r-evnaw',     // Игнорируем имя
                    'css-146c3p1 r-vw2c0b r-evnaw', // Игнорируем количество постов, подписчиков и лайков (на будущее)

                ],
            }
        );
    });


});

describe('Страница редактирования профиля', function() {

    beforeEach(async function() {
        await login(this.browser, {
            email: 'example@domen.ru', 
            password: '12345678'
        });
        const editButton = await this.browser.$('[data-testid="user-edit-profile-button"]');
        await editButton.click();
    });

    it('Страница изменения имени', async function() {
        // Проверяем наличие кнопки "Save Changes"
        const saveButton = await this.browser.$('[data-testid="edit-save-button"]');
        await expect(saveButton).toBeExisting();

        // Проверяем наличие поля для ввода имени
        const nameInput = await this.browser.$('[data-testid="edit-name-input"]');
        await expect(nameInput).toBeExisting();

        // Проверяем внешний вид страницы
        await this.browser.assertView(
            'edit-profile-page',
            {
                ignoreElements: [
                    '[data-testid="edit-name-input"]'     // Игнорируем имя
                ],
            }
        );
    });
});