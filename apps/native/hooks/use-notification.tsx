import { apiClient } from "@/lib/api-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";

export const useNotifications = (params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [...queryKeys.auth.session(), "notifications", params],
    queryFn: async () => {
      const response = await apiClient.api.notification.$get({
        query: {
          limit: String(params?.limit),
          page: String(params?.page),
        },
      });

      if (!response.ok) throw new Error("Failed to fetch notifications");

      return response.json();
    },
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isRead }: { id: string; isRead: boolean }) => {
      const response = await apiClient.api.notification[":id"].read.$patch({
        param: { id },
        json: { isRead },
      });

      if (!response.ok) throw new Error("Failed to mark notification as read");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.auth.session(), "notifications"],
      });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response =
        await apiClient.api.notification["mark-all-read"].$patch();

      if (!response.ok)
        throw new Error("Failed to mark all notifications as read");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.auth.session(), "notifications"],
      });
    },
  });
};
