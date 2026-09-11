import { authMiddleware } from "@/middleware/auth";
import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionSummary,
  listTransactions,
  updateTransaction,
} from "@/services/transaction.services";
import {
  createTransactionSchema,
  listTransactionsSchema,
  transactionSummarySchema,
  updateTransactionSchema,
} from "@cashory/schema/transaction-schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

export const transactionRoutes = new Hono()
  .use(authMiddleware)
  .get("/", zValidator("query", listTransactionsSchema), async (c) => {
    const user = c.get("user");
    const params = c.req.valid("query");

    const result = await listTransactions(user.id, params);

    return c.json(result, 200);
  })
  .get("/summary", zValidator("query", transactionSummarySchema), async (c) => {
    const user = c.get("user");
    const params = c.req.valid("query");
    const result = await getTransactionSummary(user.id, params);
    return c.json({ data: result }, 200);
  })
  .get("/:id", async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");
    const data = await getTransactionById(user.id, id);
    if (!data) return c.json({ error: "Transaction not found" }, 404);
    return c.json({ data }, 200);
  })
  .post("/", zValidator("json", createTransactionSchema), async (c) => {
    const user = c.get("user");
    const body = c.req.valid("json");
    const data = await createTransaction(user.id, body);
    return c.json({ data }, 201);
  })
  .put("/:id", zValidator("json", updateTransactionSchema), async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");
    const body = c.req.valid("json");
    const data = await updateTransaction(user.id, id, body);
    if (!data) return c.json({ error: "Transaction not found" }, 404);

    return c.json({ data }, 200);
  })
  .delete("/:id", async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");
    const data = await deleteTransaction(user.id, id);

    if (!data) return c.json({ error: "Transaction not found" }, 404);

    return c.json({ success: true }, 200);
  });
