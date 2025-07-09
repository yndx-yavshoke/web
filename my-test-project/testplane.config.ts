export default {
    gridUrl: "local",
    baseUrl: "https://yavshok.ru",
    pageLoadTimeout: 10000,
    httpTimeout: 60000,
    testTimeout: 120000,
    resetCursor: false,
    
    screenshotsDir: "testplane-screenshots",
    tolerance: 5,
    antialiasingTolerance: 0,
    assertViewOpts: {
        disableAnimation: true
    },
    
    sets: {
        // Первые тесты - главная страница
        main: {
            files: [
                "testplane-tests/shock-main.testplane.ts"
            ],
            browsers: [
                "chrome"
            ]
        },
        // Вторые тесты - логин
        login: {
            files: [
                "testplane-tests/shock-login.testplane.ts"
            ],
            browsers: [
                "chrome"
            ]
        },
        // Остальные тесты
        other: {
            files: [
                "testplane-tests/shock-register.testplane.ts",
                "testplane-tests/shock-profile.testplane.ts",
                "testplane-tests/shock-edit-profile.testplane.ts"
            ],
            browsers: [
                "chrome"
            ]
        },
        // Все тесты (для обычного запуска)
        desktop: {
            files: [
                "testplane-tests/**/*.testplane.ts"
            ],
            browsers: [
                "chrome"
            ]
        }
    },
    
    browsers: {
        chrome: {
            headless: false,
            windowSize: "800x600",
            desiredCapabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: [
                        "--disable-web-security",
                        "--disable-features=VizDisplayCompositor",
                        "--no-sandbox",
                        "--force-device-scale-factor=1"
                    ]
                }
            }
        }
    },
    
    plugins: {
        "html-reporter/testplane": {
            enabled: true,
            path: "testplane-report",
            defaultView: "all",
            diffMode: "3-up-scaled"
        }
    }
};
