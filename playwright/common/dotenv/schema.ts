import { z } from 'zod';

export const schema = z.object({
    EMAIL: z.string(),
    PASSWORD: z.string(),
});
