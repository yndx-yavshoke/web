import { authTest as test, expect } from '../setup/auth.setup';
import { test as giveMe } from '../Pages/fixtures';

//fetch data from auth.json to use it in this test :) 
giveMe.use({ storageState: '../setup/auth.json' })

test.describe('Profile Page from storage data inside auth.json', () => {
  giveMe('are we in?', async ({getProfile}) => {
    await getProfile.open();
    await getProfile.verifyProfile();
  });

  giveMe('can i logout from the account?', async ({getProfile}) => {
    await getProfile.open();
    await getProfile.logout();
  });
});