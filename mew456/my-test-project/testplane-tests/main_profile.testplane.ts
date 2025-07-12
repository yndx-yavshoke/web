describe("profile page tests", function() {

  it("default profile", async function() {
    await this.browser.url("/login");
    await this.browser.$('[data-testid="login-email-input"]').setValue("kotik@shok.com");
    await this.browser.$('[data-testid="login-password-input"]').setValue("qwerty");
    await this.browser.$('[data-testid="login-submit-button"]').click();
    
    await this.browser.waitUntil(
      async () => (await this.browser.getUrl()).includes('/'),
      { timeout: 5000 }
    );

    await stabilizeAnimations(this.browser);
    await this.browser.assertView("profile_default", "body");
  });

  it("profile name", async function() {
    await this.browser.url("/login");
    await this.browser.$('[data-testid="login-email-input"]').setValue("kotik@shok.com");
    await this.browser.$('[data-testid="login-password-input"]').setValue("qwerty");
    await this.browser.$('[data-testid="login-submit-button"]').click();
    
    await this.browser.waitUntil(
      async () => (await this.browser.getUrl()).includes('/'),
      { timeout: 5000 }
    );

    await this.browser.$('.css-146c3p1.r-vw2c0b.r-15zivkp.r-evnaw').waitForDisplayed({ timeout: 10000 });
    await stabilizeAnimations(this.browser);
    await this.browser.assertView("profile_header", '.css-146c3p1.r-vw2c0b.r-15zivkp.r-evnaw');
  });

  it("profile status", async function() {
    await this.browser.url("/login");
    await this.browser.$('[data-testid="login-email-input"]').setValue("kotik@shok.com");
    await this.browser.$('[data-testid="login-password-input"]').setValue("qwerty");
    await this.browser.$('[data-testid="login-submit-button"]').click();
    
    await this.browser.waitUntil(
      async () => (await this.browser.getUrl()).includes('/'),
      { timeout: 5000 }
    );

    await this.browser.$('css-146c3p1 r-1khnkhu r-15d164r r-ubezar').waitForDisplayed({ timeout: 10000 });
    await stabilizeAnimations(this.browser);
    await this.browser.assertView("profile_stats", 'css-146c3p1 r-1khnkhu r-15d164r r-ubezar]');
  });
});

async function stabilizeAnimations(browser: any) {
  await browser.execute(() => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        animation-play-state: paused !important;
        transition: none !important;
      }
    `;
    document.head.appendChild(style);

    document.querySelectorAll('img').forEach((img: HTMLImageElement) => {
      if (img.src && img.src.toLowerCase().endsWith('.gif')) {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width || 100;
          canvas.height = img.height || 100;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            img.src = canvas.toDataURL('image/png');
          }
        } catch (e) {
          console.log('Failed to stabilize image', e);
        }
      }
    });
  });
}