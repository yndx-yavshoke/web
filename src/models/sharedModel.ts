import Elysia, { t } from "elysia";

const UserModel = t.Object({
  id: t.Number(),
  email: t.String(),
  name: t.String(),
  age: t.Optional(t.Number()),
});

export const SharedModel = new Elysia().model({
  user: UserModel,
  errorResponse: t.Object(
    {
      fields: t.Object({}, { additionalProperties: t.String() }),
    },
    {
      title: "Error form Response",
    }
  ),
  authResponse: t.Object({
    token: t.String(),
    user: UserModel,
  }),
});
