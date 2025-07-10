# Тест-кейс "Проверка нажатия кнопки "Я в ШОКе"""
# Если не зарегистрирован – красный текст «Ты ещё не в ШОКе».

from playwright.sync_api import Page, expect

def test_button_unregisted(page: Page):

    page.goto("https://yavshok.ru/")

    page.locator('input[type="email"]').fill("unreg@sjikfhiojsndhiofjnkuiogp.com")

    page.locator('[data-testid="main-check-button"]').click()

    expect(page.locator('text=Ты еще не в ШОКе')).to_be_visible(timeout=5000)
