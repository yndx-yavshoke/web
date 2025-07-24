module.exports = {
  sets: {
    desktop: {
      files: 'tests/**/*.spec.ts' // путь к вашим тестам
    }
  },

  browsers: {
    chromium: {
      desiredCapabilities: {
        browserName: 'chromium'
      }
    }
  },

  plugins: {
    '@testplane/reporter-allure-reporter': {
      enabled: true,
      targetDir: 'allure-results'
    },
    '@testplane/storybook': {
      enabled: true
    }
  }
};