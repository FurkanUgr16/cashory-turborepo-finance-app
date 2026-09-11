import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "@/middleware/auth";
import {
  createWallet,
  deleteWallet,
  getDefaultWallet,
  getWalletById,
  listWallets,
  updateWallet,
} from "@/services/wallet.services";

import { createWalletSchema, updateWalletSchema } from "@cashory/schema";

export const walletRoutes = new Hono()
  .use(authMiddleware)
  .get("/", async (c) => {
    const user = c.get("user");

    const data = await listWallets(user.id);

    return c.json({ data });
  })
  .get("/default", async (c) => {
    const user = c.get("user");

    const data = await getDefaultWallet(user.id);

    return c.json({ data });
  })
  .get("/:id", async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");

    const data = await getWalletById(id, user.id);

    if (!data) return c.json({ error: "Wallet not found" });

    return c.json({ data });
  })
  .post("/", zValidator("json", createWalletSchema), async (c) => {
    const user = c.get("user");

    const body = c.req.valid("json");

    const data = await createWallet(user.id, body);

    return c.json({ data }, 201);
  })
  .put("/:id", zValidator("json", updateWalletSchema), async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");

    const body = c.req.valid("json");

    const data = await updateWallet(id, user.id, body);

    if (!data) return c.json({ error: "Wallet not found" }, 404);

    return c.json({ data });
  })
  .delete("/:id", async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");

    const data = await deleteWallet(id, user.id);

    if (!data) return c.json({ error: "Wallet not found" }, 404);

    return c.json({ success: true });
  });
