import pytest
from typing import Generator
from playwright.sync_api import sync_playwright, Browser, BrowserContext, Page

# фикстуры для автотестов на playwright

@pytest.fixture(scope="session")
def playwright_instance() -> Generator:
    with sync_playwright() as p:
        yield p

@pytest.fixture(scope="session")
def browser(playwright_instance) -> Generator[Browser, None, None]:
    browser = playwright_instance.chromium.launch(headless=True)
    yield browser
    browser.close()

@pytest.fixture(scope="function")
def page(browser) -> Generator[Page, None, None]:
    page = browser.new_page()
    yield page
    page.close()

@pytest.fixture(scope="function")
def logged_in_page(browser) -> Generator[Page, None, None]:
    context = browser.new_context(storage_state="storage_state.json")
    page = context.new_page()
    yield page
    page.close()
    context.close()