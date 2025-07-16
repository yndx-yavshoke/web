export const PROFILE_URL = '/';

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
          return this.browser.$('.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-11yh6sk.r-1rnoaur.r-agouwx');
     }

     get avatar() {
          return '[data-testid="user-avatar"]';
     }

     async open() {
          await this.browser.url(PROFILE_URL);
     }

} 