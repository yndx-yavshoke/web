export default {
    gridUrl: "local",
    baseUrl: "https://yavshok.ru",
    pageLoadTimeout: 0,
    httpTimeout: 60000,
    testTimeout: 30000,
    resetCursor: false,
    sets: {
        desktop: {
            files: [
                "testplane-tests/**/*.testplane.(t|j)s"
            ],
            browsers: [
                "chrome"
            ]
        }
    },
    browsers: {
        chrome: {
            headless: true,
            desiredCapabilities: {
                browserName: "chrome"
            },
            windowSize: "1920x1080"
        },
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