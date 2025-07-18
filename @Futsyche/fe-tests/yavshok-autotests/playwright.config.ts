import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './tests',
    timeout: 30 * 1000,
    expect: {
        timeout: 5000
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        actionTimeout: 0,
        trace: 'on-first-retry',
        baseURL: 'https://yavshok.ru',
        headless: false, // Для отладки можно включить браузер
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