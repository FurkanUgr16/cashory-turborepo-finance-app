import { authMiddleware } from "@/middleware/auth";
import {
  createNotification,
  listNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/services/notification.services";
import {
  createNotificationSchema,
  listNotificationsSchema,
  updateNotificationReadSchema,
} from "@cashory/schema/notification-schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

export const notificationRoutes = new Hono()
  .use(authMiddleware)
  .get("/", zValidator("query", listNotificationsSchema), async (c) => {
    const user = c.get("user");
    const params = c.req.valid("query");
    const notifications = await listNotifications(user.id, params);
    return c.json(notifications);
  })
  .post("/", zValidator("json", createNotificationSchema), async (c) => {
    const user = c.get("user");
    const data = c.req.valid("json");
    const notification = await createNotification(user.id, data);
    return c.json(notification);
  })
  .patch("mark-all-read", async (c) => {
    const user = c.get("user");
    await markAllNotificationsRead(user.id);

    return c.json({ success: true });
  })
  .patch(
    "/:id/read",
    zValidator("json", updateNotificationReadSchema),
    async (c) => {
      const user = c.get("user");
      const id = c.req.param("id");
      const { isRead } = c.req.valid("json");

      await markNotificationRead(user.id, id, isRead);

      return c.json({ success: true });
    },
  );
