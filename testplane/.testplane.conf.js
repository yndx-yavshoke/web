module.exports = {
    baseUrl: 'https://yavshok.ru/',
    gridUrl: 'http://localhost:9515',
    browsers: {
        chrome: {
            headless: true,
            desiredCapabilities: {
                browserName: "chrome"
            }
        }
    },
    sets: {
        common: {
            files: 'tests/visual/**/*.visual.js'
        }
    },
    /*
    plugins: {
        'html-reporter': {
            path: 'hermione-report'
        }
    }
    */
};