import { login } from './testplane-tests/setup/auth.setup';

export default {
  gridUrl: "local",
  baseUrl: "https://yavshok.ru",
  pageLoadTimeout: 0,
  httpTimeout: 60000,
  testTimeout: 90000,
  resetCursor: false,
  sets: {
    desktop: {
      files: [
        "testplane-tests/**/*.testplane.ts",
      ],
      browsers: [
        "firefox"
      ]
    }
  },
  browsers: {
    firefox: {
      headless: false,
      desiredCapabilities: {
        browserName: "firefox"
      }
    }
  },
  plugins: {
    "html-reporter/testplane": {
      enabled: true,
      path: "testplane-report",
      defaultView: "all",
      diffMode: "3-up-scaled"
    },
    "testplane-global-hook": {
      enabled: true,
      beforeEach: async function(this: any) {
        const currentTestPath = this.currentTest?.file || '';
        const fileName = currentTestPath.split(/[\\/]/).pop() || '';

        if (fileName.includes('profile') || fileName.includes('edit')) {
          await login(this.browser);

          await this.browser.execute(() => {
            const style = document.createElement('style');
            style.textContent = `
              * {
                animation: none !important;
                transition: none !important;
              }
              img[src$=".gif"] {
                display: none !important;
              }
            `;
            document.head.appendChild(style);
          });
        }
      },
      afterEach: async function(this: any) {
        await this.browser.execute(() => {
          localStorage.clear();
          sessionStorage.clear();
        });
      }
    }
  }
};
