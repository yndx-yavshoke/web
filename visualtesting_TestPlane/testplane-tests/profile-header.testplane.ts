import * as Selectors from "../helper/selectors";
import { loginIfNeeded } from '../helper/auth';

describe("Profile Header Visual Tests", () => {
  beforeEach(async ({ browser }) => {
    await loginIfNeeded(browser);
    await browser.openAndWait(Selectors.homeUrl);
  });

  it("clean header (with hidden GIF)", async ({ browser }) => {
    await browser.openAndWait(Selectors.homeUrl);

    await browser.execute(() => {
      const gif = document.querySelector('[data-testid="user-avatar"] img');
      if (gif) gif.remove();
    });

    await browser.assertView("profile-header", '.css-175oi2r.r-cmw9f2.r-qklmqi.r-15d164r.r-13qz1uu');
  });

  it("split: avatar and username", async ({ browser }) => {
    await browser.openAndWait(Selectors.homeUrl);
    await browser.pause(2000);

    await browser.assertView("avatar-block", Selectors.ava);
    await browser.assertView("username-block", Selectors.usr);
    await browser.assertView("logout-block", Selectors.logoutBtn);
  });
});
