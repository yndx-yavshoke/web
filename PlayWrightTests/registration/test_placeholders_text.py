# Проверка присутствия плейсхолдеров - У полей должны быть плейсхолдеры. Email: Email». Пароль: «Пароль» (с маской "******"). Возраст: «Возраст»

from playwright.sync_api import Page, expect

def test_placeholders_test(page: Page):
    page.goto("https://yavshok.ru/register")

    email_input = page.locator('[data-testid="register-email-input"]')
    expect(email_input).to_have_attribute("placeholder", "Email")

    password_input = page.locator('[data-testid="register-password-input"]')
    expect(password_input).to_have_attribute("placeholder", "Пароль")

    age_input = page.locator('[data-testid="register-age-input"]')
    expect(age_input).to_have_attribute("placeholder", "Возраст")

