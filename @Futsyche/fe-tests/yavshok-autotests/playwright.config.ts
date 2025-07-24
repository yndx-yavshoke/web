import { defineConfig } from '@playwright/test';
import  PluginAllure  from 'allure-playwright';

const config = {
    testDir: './tests',
    timeout: 30 * 1000,
    expect: {
        timeout: 5000
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['list'], // Консольный вывод
        ['html'], // HTML отчет Playwright
        ['allure-playwright', { outputFolder: 'allure-results' }], // Allure отчет
        
    ],
    use: {
        actionTimeout: 0,
        trace: 'on-first-retry',
        baseURL: 'https://yavshok.ru',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    projects: [
        {
            name: 'chromium',
            use: { 
                channel: 'chrome',
                viewport: { width: 1280, height: 720 }
            },
        },
    ],
};

export default config;