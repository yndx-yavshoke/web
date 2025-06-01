import { treaty } from "@elysiajs/eden";
import type { App } from "../../../../../server/src/index";
import { env } from "../../config/env";

export const createAuthenticatedApiClient = (token: string) => {
  return treaty<App>(env.API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}; 