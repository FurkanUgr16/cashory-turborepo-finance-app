import { queryKeys } from "@/lib/query-keys";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
  ListCategoryQuery,
} from "@cashory/schema";

export const useCategories = (type?: "income" | "expense") => {
  return useQuery({
    queryKey: queryKeys.categories.list(type),
    queryFn: async () => {
      const response = await apiClient.api.category.$get({
        query: type ? { type } : {},
      });

      if (!response.ok) throw new Error("Failed to fetch categories");

      return response.json();
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateCategoryInput) => {
      const response = await apiClient.api.category.$post({
        json: data,
      });

      if (!response.ok) throw new Error("Failed to create category");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateCategoryInput;
    }) => {
      const response = await apiClient.api.category[":id"].$put({
        param: { id },
        json: data,
      });

      if (!response.ok) throw new Error("Failed to update category");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.api.category[":id"].$delete({
        param: { id },
      });

      if (!response.ok) throw new Error("Failed to delete category");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
};
