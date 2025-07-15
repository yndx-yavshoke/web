export const PROFILE_URL = '/profile';

export class ProfilePage {
     constructor(private browser: any) {
          this.browser = browser;
     }

     get header() {
          return this.browser.$('[data-testid="user-avatar"]').parentElement().parentElement();
     }

     get stats() {
          return this.browser.$('.r-18u37iz.r-a2tzq0.r-156q2ks.r-15m1z73.r-u9wvl5');
     }

     get status() {
          return this.browser.$('[data-testid="user-avatar"] + div .r-1khnkhu');
     }

     get gallery() {
          return this.browser.$('[data-testid^="gallery-item-0"]').parentElement().parentElement();
     }

     async open() {
          await this.browser.url(PROFILE_URL);
     }

     // async hideGif() {
     //      await this.browser.execute(() => {
     //           const avatar = document.querySelector('[data-testid="user-avatar"] img');
     //           if (avatar && avatar instanceof HTMLElement) {
     //                avatar.style.visibility = 'hidden';
     //           }
     //      });
     // }
} 