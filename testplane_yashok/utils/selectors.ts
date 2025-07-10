// Общие селекторы для всех страниц
export const COMMON_SELECTORS = {
  AVATAR: '[data-testid="user-avatar"]',
  LOGOUT_BUTTON: '[data-testid="user-logout-button"]',
};

// Селекторы для шапки профиля
export const PROFILE_SELECTORS = {
  AVATAR: '[data-testid="user-avatar"]',
  LOGOUT_BUTTON: '[data-testid="user-logout-button"]',
  STATS: '.css-175oi2r.r-18u37iz.r-a2tzq0.r-156q2ks.r-15m1z73.r-u9wvl5',
  HEADER: '.css-175oi2r.r-cmw9f2.r-qklmqi.r-15d164r.r-13qz1uu',
};

// Селекторы для страницы редактирования профиля
export const EDIT_PROFILE_SELECTORS = {
  EDIT_BUTTON: '//div[contains(text(), "Edit Profile")]',
  NAME_INPUT: '[data-testid="edit-name-input"]',
  SAVE_BUTTON: '[data-testid="edit-save-button"]',
  CANCEL_BUTTON: '[data-testid="edit-cancel-button"]',
};

// Селекторы для страницы входа
export const LOGIN_SELECTORS = {
  EMAIL_INPUT: '[data-testid="login-email-input"]',
  PASSWORD_INPUT: '[data-testid="login-password-input"]',
  SUBMIT_BUTTON: '[data-testid="login-submit-button"]',
  BACK_BUTTON: '[data-testid="login-back-button"]',
  REGISTER_BUTTON: '[data-testid="login-register-button"]',
  EMAIL_ERROR:
    '//input[@data-testid="login-email-input"]/following-sibling::div[contains(text(), "Введите email")]',
  PASSWORD_ERROR:
    '//input[@data-testid="login-password-input"]/following-sibling::div[contains(text(), "Введите пароль")]',
  GENERAL_ERROR: '//div[contains(text(), "Неправильный логин или пароль")]',
};
