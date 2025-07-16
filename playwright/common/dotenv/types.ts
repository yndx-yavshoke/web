import { ZodString } from 'zod'

export interface IEnvVariables {
    EMAIL: string;
    PASSWORD: string;
}

export interface IDotenv {
    init: () => void;
    var: IEnvVariables;
}
