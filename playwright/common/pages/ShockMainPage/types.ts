import { ShockMainPageModel } from '@common/models';

export interface IShockMainPageActions {
    checkEmail: (email: string, valid: boolean) => void;
}
