# Проверка присутствия плейсхолдеров - У полей должны быть плейсхолдеры. Email: «Email». Пароль: «Пароль» 

from playwright.sync_api import Page, expect

def test_placeholders_login(page: Page):
    page.goto("https://yavshok.ru/login")

    assert page.locator('[data-testid="login-email-input"]').get_attribute('placeholder') == "Email", "У емайла нет плейса"
    assert page.locator('[data-testid="login-password-input"]').get_attribute('placeholder') == "Пароль", "У пароля нет плейса"