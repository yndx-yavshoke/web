import { Page, Locator } from '@playwright/test';

export class AuthPage {
    private readonly page: Page;

    // Основные элементы формы
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly submitButton: Locator;
    
    // Дополнительные кнопки
    readonly backButton: Locator;
    readonly registerLink: Locator;
    
    // Сообщения об ошибках
    readonly emailError: Locator;
    readonly passwordError: Locator;
    readonly authError: Locator;

    constructor(page: Page) {
        this.page = page;

        // Инициализация элементов формы
        this.emailField = page.locator('#auth-email');
        this.passwordField = page.locator('#auth-password');
        this.submitButton = page.locator('button[type="submit"]');
        
        // Альтернативные действия
        this.backButton = page.locator('button:has-text("Назад")');
        this.registerLink = page.locator('a:has-text("Регистрация")');
        
        // Элементы ошибок
        this.emailError = page.locator('.email-error');
        this.passwordError = page.locator('.password-error');
        this.authError = page.locator('.auth-error');
    }

    /**
     * Открывает страницу авторизации
     */
    async visit() {
        await this.page.goto('/auth');
    }

    /**
     * Выполняет попытку входа в систему
     * @param credentials - Объект с email и паролем
     */
    async signIn(credentials: { email: string; password: string }) {
        await this.emailField.fill(credentials.email);
        await this.passwordField.fill(credentials.password);
        await this.submitButton.click();
    }

    /**
     * Переходит на страницу регистрации
     */
    async goToRegistration() {
        await this.registerLink.click();
    }

    /**
     * Возвращается на предыдущую страницу
     */
    async goBack() {
        await this.backButton.click();
    }
}