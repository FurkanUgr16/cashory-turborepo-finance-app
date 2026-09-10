import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "@/middleware/auth";
import {
  createCategorySchema,
  listCategorySchema,
  updateCategorySchema,
} from "@cashory/schema";
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from "@/services/category.services";

export const categoryRoutes = new Hono()
  .use(authMiddleware)
  .get("/", zValidator("query", listCategorySchema), async (c) => {
    const user = c.get("user");

    const { type } = c.req.valid("query");

    const categories = await listCategories(user.id, type);

    return c.json(categories);
  })
  .post("/", zValidator("json", createCategorySchema), async (c) => {
    const user = c.get("user");
    const body = c.req.valid("json");

    const newCategory = await createCategory(user.id, body);

    return c.json(newCategory, 201);
  })
  .put("/:id", zValidator("json", updateCategorySchema), async (c) => {
    const user = c.get("user");
    const body = c.req.valid("json");
    const id = c.req.param("id");

    const updatedCategory = await updateCategory(user.id, id, body);

    if (!updatedCategory) return c.json({ error: "Category not found" }, 404);

    return c.json({ data: updatedCategory });
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const user = c.get("user");

    const result = await deleteCategory(user.id, id);

    if (!result) return c.json({ error: "Category not found" }, 404);

    return c.json({ success: true });
  });
