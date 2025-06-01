import { treaty } from "@elysiajs/eden";
import type { App } from "../../../../../server/src/index";
import { env } from "../../config/env";

export const apiClient = treaty<App>(env.API_URL);
