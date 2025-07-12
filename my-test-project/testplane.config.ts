export default {
  gridUrl: "local",
  baseUrl: "http://yavshok.ru",
  pageLoadTimeout: 0,
  httpTimeout: 60000,
  testTimeout: 90000,
  resetCursor: false,

  screenshotsDir: "testplane-screenshots",
    tolerance: 5,
    antialiasingTolerance: 0,
    assertViewOpts: {
        disableAnimation: true
    },

  sets: {
    desktop: {
      files: ["testplane-tests/**/*.testplane.ts"],
      browsers: ["chrome"]
    }
  },

  browsers: {
    chrome: {
      headless: true,
      desiredCapabilities: {
        browserName: "chrome"
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