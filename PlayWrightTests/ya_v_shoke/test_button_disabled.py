# Тест-кейс "Проверка доступности кнопки 'Я в ШОКе'" - Кнопка должна быть доступна только при введенном email.

from playwright.sync_api import Page

def test_button_disabled(page: Page):
    page.goto("https://yavshok.ru/")

    shock_button = page.locator('[data-testid="main-check-button"]')
    email_input = page.locator('input[type="email"]')

    assert shock_button.get_attribute("aria-disabled") == "true", 'Кнопка "Я в шоке?" доступна без email'

    email_input.fill('test@example.com')

    assert shock_button.get_attribute("aria-disabled") is None, 'Кнопка "Я в шоке?" осталась неактивной после ввода email'


