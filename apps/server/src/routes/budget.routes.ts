import { Hono } from "hono";
import {
  createBudget,
  deleteBudget,
  getBudgetById,
  listBudgets,
  updateBudget,
} from "@/services/budget.services";
import {
  createBudgetSchema,
  updateBudgetSchema,
} from "@cashory/schema/budget-schema";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "@/middleware/auth";

export const budgetRoutes = new Hono()
  .use(authMiddleware)
  .get("/", async (c) => {
    const user = c.get("user");
    const budgets = await listBudgets(user.id);
    return c.json({ budgets });
  })
  .get(":id", async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");

    const budget = await getBudgetById(id, user.id);

    if (!budget) return c.json({ error: "Budget not found" }, 404);

    return c.json({ budget });
  })
  .post("/", zValidator("json", createBudgetSchema), async (c) => {
    const user = c.get("user");
    const body = c.req.valid("json");

    const data = await createBudget(user.id, body);

    return c.json({ data }, 201);
  })
  .put(":id", zValidator("json", updateBudgetSchema), async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");
    const body = c.req.valid("json");

    const data = await updateBudget(id, user.id, body);

    if (!data) return c.json({ error: "Budget not found" }, 404);

    return c.json({ data });
  })
  .delete(":id", async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");

    const data = await deleteBudget(id, user.id);

    if (!data) return c.json({ error: "Budget not found" }, 404);

    return c.json({ success: true });
  });
