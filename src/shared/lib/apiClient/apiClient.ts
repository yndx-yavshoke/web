import { treaty } from "@elysiajs/eden";
import type { App } from "@yndx-yavshoke/backend";
import { env } from "../../config/env";

export const apiClient = treaty<App>(env.API_URL);
