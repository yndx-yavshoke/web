import dotenvBase from 'dotenv';

import { IDotenv } from './types';
import { schema } from './schema';

const dotenv: IDotenv = {
    init: () => {
        dotenvBase.config();
    },
    get var() {
        return schema.parse(process.env);
    },
}

export { dotenv };
