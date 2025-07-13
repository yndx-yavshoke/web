import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
    private readonly page: Page;

    // Элементы формы
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly ageInput: Locator;
    readonly registerButton: Locator;
    readonly backButton: Locator;

    // Сообщения об ошибках (не readonly, чтобы можно было инициализировать в конструкторе)
    errors: {
        email: {
            empty: Locator;
            invalid: Locator;
            exists: Locator;
        };
        password: {
            empty: Locator;
            tooShort: Locator;
        };
        age: {
            empty: Locator;
            notNumber: Locator;
            outOfRange: Locator;
        };
    };

    constructor(page: Page) {
        this.page = page;

        // Инициализация полей формы
        this.emailInput = page.getByPlaceholder('Email', { exact: true });
        this.passwordInput = page.getByPlaceholder('Пароль', { exact: true });
        this.ageInput = page.getByPlaceholder('Возраст', { exact: true });
        this.registerButton = page.getByText('Зарегистрироваться', { exact: true });
        this.backButton = page.getByText('Назад', { exact: true });

        // Инициализация сообщений об ошибках
        this.errors = {
            email: {
                empty: page.getByText('Введите email'),
                invalid: page.getByText('Неправильный email-адрес'),
                exists: page.getByText('Пользователь с таким email уже существует'),
            },
            password: {
                empty: page.getByText('Введите пароль'),
                tooShort: page.getByText('Пароль должен содержать минимум 6 символов'),
            },
            age: {
                empty: page.getByText('Введите возраст'),
                notNumber: page.getByText('Возраст должен быть числом'),
                outOfRange: page.getByText('Возраст должен быть от 0 до 99 лет'),
            }
        };
    }

    /**
     * Открывает страницу регистрации
     */
    async open() {
        await this.page.goto('/register');
    }

    /**
     * Заполняет и отправляет форму регистрации
     */
    async register(email: string, password: string, age: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.ageInput.fill(age);
        await this.registerButton.click();
    }

    // ===== Методы проверки ошибок =====

    // Email ошибки
    async shouldShowEmptyEmailError() {
        await expect(this.errors.email.empty).toBeVisible();
    }

    async shouldShowInvalidEmailError() {
        await expect(this.errors.email.invalid).toBeVisible();
    }

    async shouldShowEmailExistsError() {
        await expect(this.errors.email.exists).toBeVisible();
    }

    // Password ошибки
    async shouldShowEmptyPasswordError() {
        await expect(this.errors.password.empty).toBeVisible();
    }

    async shouldShowShortPasswordError() {
        await expect(this.errors.password.tooShort).toBeVisible();
    }

    // Age ошибки
    async shouldShowEmptyAgeError() {
        await expect(this.errors.age.empty).toBeVisible();
    }

    async shouldShowAgeNotNumberError() {
        await expect(this.errors.age.notNumber).toBeVisible();
    }

    async shouldShowAgeOutOfRangeError() {
        await expect(this.errors.age.outOfRange).toBeVisible();
    }

    /**
     * Возврат на предыдущую страницу
     */
    async goBack() {
        await this.backButton.click();
    }
}