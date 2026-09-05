import { createMiddleware } from "hono/factory";
import { auth } from "@cashory/auth";
import type { User, Session } from "better-auth/types";

type AuthEnv = {
  Variables: {
    user: User;
    session: Session;
  };
};

export const authMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);

  await next();
});
