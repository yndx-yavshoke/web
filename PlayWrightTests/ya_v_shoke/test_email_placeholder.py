# Тест-кейс "Проверка плейсхолдера для email" - При отсутствии введенного email должен быть плейсхолдер "email".

from playwright.sync_api import Page

def test_email_placeholder(page: Page):
    page.goto("https://yavshok.ru/")
    email_input = page.locator('input[type="email"]')
    placeholder = email_input.get_attribute('placeholder')
    assert placeholder == "Введите email", f'Ожидается "Введите email", однако в плейсхолдере отображено "{placeholder}"'