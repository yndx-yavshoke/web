// Types
export interface TestIdProps {
  testID: string;
  enableTestId?: boolean;
}

// Utilities
export const createTestId = (prefix: string, suffix?: string): string => {
  return suffix ? `${prefix}_${suffix}` : prefix;
};

export const TestIds = {
  // Authentication
  LOGIN_BUTTON: 'login_button',
  SIGNUP_BUTTON: 'signup_button',
  EMAIL_INPUT: 'email_input',
  PASSWORD_INPUT: 'password_input',
  CONFIRM_PASSWORD_INPUT: 'confirm_password_input',
  
  // Navigation
  BACK_BUTTON: 'back_button',
  MENU_BUTTON: 'menu_button',
  HOME_BUTTON: 'home_button',
  
  // Common actions
  SUBMIT_BUTTON: 'submit_button',
  CANCEL_BUTTON: 'cancel_button',
  SAVE_BUTTON: 'save_button',
  DELETE_BUTTON: 'delete_button',
  EDIT_BUTTON: 'edit_button',
  
  // Search and filters
  SEARCH_INPUT: 'search_input',
  SEARCH_BUTTON: 'search_button',
  FILTER_BUTTON: 'filter_button',
  
  // Loading states
  LOADING_INDICATOR: 'loading_indicator',
  REFRESH_BUTTON: 'refresh_button',
  
  // Forms
  FORM_CONTAINER: 'form_container',
  INPUT_FIELD: 'input_field',
  
  // Lists and items
  LIST_CONTAINER: 'list_container',
  LIST_ITEM: 'list_item',
  
} as const;

export type TestIdKey = keyof typeof TestIds; 