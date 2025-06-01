import { Elysia, t } from "elysia";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const existController = new Elysia().post(
  "/exist",
  async ({ body: { email } }) => {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email as string))
      .limit(1);

    return {
      exist: user.length > 0,
    };
  },
  {
    body: t.Object({
      email: t.String(),
    }),
    response: {
      "200": t.Object({
        exist: t.Boolean(),
      }),
    },
    detail: {
      summary: "Check if user exists",
    },
  }
);
