import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "../middleware/auth";
import {
  createInvoiceSchema,
  updateInvoiceStatusSchema,
  listInvoicesSchema,
} from "@cashory/schema";
import {
  listInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoiceStatus,
  deleteInvoice,
  generateInvoiceHtml,
} from "../services/invoice.services";

export const invoiceRoutes = new Hono()
  .use(authMiddleware)
  .get("/", zValidator("query", listInvoicesSchema), async (c) => {
    const user = c.get("user");
    const params = c.req.valid("query");
    const result = await listInvoices(user.id, params);
    return c.json(result);
  })
  .get("/:id", async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");
    const data = await getInvoiceById(user.id, id);

    if (!data) return c.json({ error: "Invoice not found" }, 404);

    return c.json({ data });
  })
  .get("/:id/html", async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");
    const html = await generateInvoiceHtml(user.id, id);
    if (!html) return c.json({ error: "Invoice not found" }, 404);

    return c.json({ html });
  })
  .post("/", zValidator("json", createInvoiceSchema), async (c) => {
    const user = c.get("user");
    const body = c.req.valid("json");
    const data = await createInvoice(user.id, body);

    return c.json({ data }, 201);
  })
  .patch(
    "/:id/status",
    zValidator("json", updateInvoiceStatusSchema),
    async (c) => {
      const user = c.get("user");
      const id = c.req.param("id");
      const { status } = c.req.valid("json");
      const data = await updateInvoiceStatus(user.id, id, status);
      if (!data) return c.json({ error: "Invoice not found" }, 404);
      return c.json({ data });
    },
  )
  .delete("/:id", async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");
    const data = await deleteInvoice(user.id, id);

    if (!data) return c.json({ error: "Invoice not found" }, 404);

    return c.json({ success: true });
  });
