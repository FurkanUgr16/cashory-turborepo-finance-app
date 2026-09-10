import { env } from "@cashory/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "@cashory/auth";
import { categoryRoutes } from "./routes/category.routes";

const app = new Hono()
  .use(logger())
  .use(
    "/*",
    cors({
      origin: env.CORS_ORIGIN,
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization", "Cookie"],
      credentials: true,
    }),
  )
  .on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))
  .route("/api/category", categoryRoutes)
  .onError((err, c) => {
    console.error("Server Errror", err);
    return c.json(
      {
        error: err.message || "Interval Server Error",
        ...(env.NODE_ENV === "production" ? { stack: err.stack } : {}),
      },
      500,
    );
  })
  .notFound((c) => {
    return c.json({ error: "Not Found" }, 404);
  });

export default app;

export type AppType = typeof app;
