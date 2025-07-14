import { ShockMainPageModel } from '@common/models';

export interface IShockLoginPageActions {
    login: (email: string, password: string) => void;
}
