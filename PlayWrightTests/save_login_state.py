
# скрпт для создания файла с кредами для авторизации
# запускатся по команде python3 PlayWrightTests/save_login_state.py

from playwright.sync_api import sync_playwright

def save_login_state():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()

        page.goto("https://yavshok.ru/login")
        page.fill('[data-testid="login-email-input"]', "exampletest@example.com")
        page.fill('[data-testid="login-password-input"]', "testtest")  
        page.click('[data-testid="login-submit-button"]')

        page.wait_for_url("https://yavshok.ru/")

        context.storage_state(path="storage_state.json")
        browser.close()

if __name__ == "__main__":
    save_login_state()

