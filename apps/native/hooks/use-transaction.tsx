import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { apiClient } from "@/lib/api-client";
import type {
  CreateTransactionInput,
  TransactionSummaryQuery,
  UpdateTransactionInput,
} from "@cashory/schema";

type TransactionListParams = {
  [key: string]: unknown;
  page?: number;
  limit?: number;
  type?: "income" | "expense";
  walletId?: string;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
};

export const useTransactionList = (params?: TransactionListParams) => {
  return useQuery({
    queryKey: queryKeys.transactions.list(params),
    queryFn: async () => {
      const response = await apiClient.api.transaction.$get({
        query: {
          page: String(params?.page ?? 1),
          limit: String(params?.limit ?? 20),
          ...(params?.type ? { type: params.type } : {}),
          ...(params?.walletId ? { walletId: params.walletId } : {}),
          ...(params?.categoryId ? { categoryId: params.categoryId } : {}),
          ...(params?.startDate ? { startDate: params.startDate } : {}),
          ...(params?.endDate ? { endDate: params.endDate } : {}),
        },
      });

      if (!response.ok) throw new Error("Failed to fetch transactions");

      return response.json();
    },
  });
};

export const useTransactionId = (id: string) => {
  return useQuery({
    queryKey: queryKeys.transactions.detail(id),
    queryFn: async () => {
      const response = await apiClient.api.transaction[":id"].$get({
        param: { id },
      });

      if (!response.ok) throw new Error("Failed to fetch transaction");

      return response.json();
    },
  });
};

export const useTransactionSummary = (params: TransactionSummaryQuery) => {
  return useQuery({
    queryKey: queryKeys.transactions.summary(),
    queryFn: async () => {
      const response = await apiClient.api.transaction.summary.$get({
        query: {
          ...(params.walletId ? { walletId: params.walletId } : {}),
          ...(params.startDate ? { startDate: params.startDate } : {}),
          ...(params.endDate ? { endDate: params.endDate } : {}),
        },
      });

      if (!response.ok) throw new Error("Failed to fetch transaction summary");

      return response.json();
    },
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateTransactionInput) => {
      const response = await apiClient.api.transaction.$post({
        json: data,
      });

      if (!response.ok) throw new Error("Failed to create transaction");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.all });
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTransactionInput;
    }) => {
      const response = await apiClient.api.transaction[":id"].$put({
        param: { id },
        json: data,
      });

      if (!response.ok) throw new Error("Failed to update transaction");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.all });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.api.transaction[":id"].$delete({
        param: { id },
      });

      if (!response.ok) throw new Error("Failed to delete transaction");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.all });
    },
  });
};
