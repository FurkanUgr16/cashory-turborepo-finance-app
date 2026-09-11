import { env } from "@cashory/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "@cashory/auth";
import { categoryRoutes } from "./routes/category.routes";
import { walletRoutes } from "./routes/wallet.routes";
import { budgetRoutes } from "./routes/budget.routes";
import { transactionRoutes } from "./routes/transaction.routes";
import { notificationRoutes } from "./routes/notification.routes";
import { invoiceRoutes } from "./routes/invoice.routes";

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
  .get("/", async (c) => {
    return c.json({ message: "ok" }, 200);
  })
  .route("/api/category", categoryRoutes)
  .route("/api/wallet", walletRoutes)
  .route("/api/budget", budgetRoutes)
  .route("/api/notification", notificationRoutes)
  .route("/api/transaction", transactionRoutes)
  .route("/api/invoice", invoiceRoutes)
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
