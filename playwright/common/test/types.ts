import { IEnvVariables } from '@common/dotenv/types';
import { IShockPages } from '@common/pages/types';

export type TestFixturesType = IShockPages & {
    env: IEnvVariables;
}
