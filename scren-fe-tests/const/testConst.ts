export const VALID_USER = {
    email: "adizen@ya.ru",
    password: "123456",
    age: 18
}

export const VALID_NAME = {
    serg: "Serg",
    newName: "KitKot"
}

export const URLS = {
    loginURL: "/login",
    homeURL: "/",
    registerURL: "/register",
    editURL: "/edit"
}

export const TIMEOUT = {
    min: 5000, 
    max: 15000
}

export const SELECTORS = {

    main_page: {
        main_email_input: '[data-testid="main-email-input"]',
        main_check_button: '[data-testid="main-check-button"]',
        main_login_button: '[data-testid="main-login-button"]', 
        gif_main_happy_cat: 'img[src*="happyCat"]',
        exist_main_text_true: "//*[contains(text(), 'Ты уже в ШОКе')]",
        exist_main_text_false: "//*[contains(text(), 'Ты еще не в ШОКе')]"
    },
    login_page: {
        title_login_page: "//*[contains(text(), 'Войти в ШОК')]",
        login_email_input: '[data-testid="login-email-input"]',
        login_password_input: '[data-testid="login-password-input"]',
        login_submit_button: '[data-testid="login-submit-button"]',
        login_back_button: '[data-testid="login-back-button"]',
        login_register_button: '[data-testid="login-register-button"]',
        login_empty_email: "//*[contains(text(), 'Введите email')]", 
        login_empty_password: "//*[contains(text(), 'Введите пароль')]",
        login_error_input: "//*[contains(text(), 'Произошла ошибка')]"
    },
    register_page: {
        title_register_page: "//*[contains(text(), 'Регистрация в ШОКе')]",
        register_email_input: '[data-testid="register-email-input"]',
        register_password_input: '[data-testid="register-password-input"]',
        register_age_input: '[data-testid="register-age-input"]',
        register_submit_button: '[data-testid="register-submit-button"]', 
        register_back_button: '[data-testid="register-back-button"]',
        register_empty_email: "//*[contains(text(), 'Введите email')]", 
        register_empty_password: "//*[contains(text(), 'Введите пароль')]",
        register_empty_age: "//*[contains(text(), 'Введите возраст')]",
        register_error_email: "//*[contains(text(), 'Неправильный email-адрес')]",
        register_error_minlen_password: "//*[contains(text(), 'Пароль должен содержать минимум 6 символов')]",
        register_error_age: "//*[contains(text(), 'Возраст должен быть числом')]",
        register_email_using: "//*[contains(text(), 'Пользователь с таким email уже существует')]"
    },
    user_page: {
        user_edit_button: '[data-testid="user-edit-profile-button"]',
        user_logout_button: '[data-testid="user-logout-button"]',
        gif_user_avatar: 'img[src^="/assets/assets/images/profile."][src$=".gif"]',
        new_name: "//*[contains(text(), 'KitKot')]"
    },
    edit_page: {
        edit_input_email: '[data-testid="edit-name-input"]',
        edit_save_button: '[data-testid="edit-save-button"]',
        edit_cancel_button: '[data-testid="edit-cancel-button"]'
    }

}