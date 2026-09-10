import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { CreateWalletInput, UpdateWalletInput } from "@cashory/schema";

export const useGetWallets = () => {
  return useQuery({
    queryKey: queryKeys.wallet.all,
    queryFn: async () => {
      const response = await apiClient.api.wallet.$get();

      if (!response.ok) throw new Error("Failed to fetch wallets");

      return response.json();
    },
  });
};

export const useGetWalletById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.wallet.details(id),
    queryFn: async () => {
      const response = await apiClient.api.wallet[":id"].$get({
        param: { id },
      });

      if (!response.ok) throw new Error("Wallet not found");

      return response.json();
    },
  });
};

export const useGetDefaultWallet = () => {
  return useQuery({
    queryKey: queryKeys.wallet.default(),
    queryFn: async () => {
      const response = await apiClient.api.wallet.default.$get();

      if (!response.ok) throw new Error("Default wallet not found");

      return response.json();
    },
  });
};

// mutatinons

export const useCreateWallet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateWalletInput) => {
      const response = await apiClient.api.wallet.$post({ json: data });

      if (!response.ok) throw new Error("Failed to create wallet");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.all });
    },
  });
};

export const useUpdateWallet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateWalletInput;
    }) => {
      const response = await apiClient.api.wallet[":id"].$put({
        param: { id },
        json: data,
      });

      if (!response.ok) throw new Error("Failed to update wallet");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.all });
    },
  });
};

export const useDeleteWallet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.api.wallet[":id"].$delete({
        param: { id },
      });

      if (!response.ok) throw new Error("Failed to delete wallet");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.all });
    },
  });
};
