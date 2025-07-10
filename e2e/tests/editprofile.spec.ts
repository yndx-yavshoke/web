import { authTest as test, expect } from '../setup/auth.setup';
import { test as newOne } from '../Pages/fixtures';

//fetch data from auth.json to use it in this test :) 
newOne.use({ storageState: '../setup/auth.json' })
test.describe('so changing name for the user', () => {

  newOne('lets make new name', async ({editing}) => {
    await editing.open();
    await editing.editProfile('Am a Marvel');
  });

  newOne('empty name error', async ({editing}) => {
    await editing.open();
    await editing.expectMisNameError('');
  });

  newOne('name more then 50 symbols', async ({editing}) => {
    await editing.open();
    await editing.expect50SymbolName('jkrebihjer vijerbijvreivrwevrewhjivbehirwvbehirwbvherubvhuerbvuhbervejv eijrvb jierbv ijerbver');
  });
});