# Тест-кейс "Проверка нажатия кнопки "Я в ШОКе"""
# Если зарегистрирован, то появляется GIF с котом и зелёный текст «Ты уже в ШОКе». 

from playwright.sync_api import Page, expect

def test_button_registed(page: Page):

    page.goto("https://yavshok.ru/")

    page.locator('input[type="email"]').fill("test@example.com")

    page.locator('[data-testid="main-check-button"]').click()

    expect(page.locator('text=Ты уже в ШОКе')).to_be_visible(timeout=5000)
    assert page.locator('img[src*="happyCat"]').is_visible(), "GIF с котом не появился"