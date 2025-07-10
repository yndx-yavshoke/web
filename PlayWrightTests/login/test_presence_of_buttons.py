# Проверка присуствия кнопок - На экране должны быть кнопки "В шок", "Назад" и "Регистрация"

from playwright.sync_api import Page, expect

def test_presence_of_buttons(page: Page):
    page.goto("https://yavshok.ru/login") 

    expect(page.locator('[data-testid="login-submit-button"]')).to_be_visible()  
    expect(page.locator('[data-testid="login-back-button"]')).to_be_visible() 
    expect(page.locator('[data-testid="login-register-button"]')).to_be_visible()  

