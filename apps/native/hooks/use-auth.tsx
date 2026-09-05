import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { queryKeys } from "@/lib/query-keys";

export const useAuthSession = () => {
  return useQuery({
    queryKey: queryKeys.auth.session,
    queryFn: () => authClient.getSession(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const res = await authClient.signUp.email({ email, name, password });

      if (res.error) throw new Error(res.error.message || "Signup Failed");

      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.all,
      });
    },
    onError: (e) => {
      throw new Error(e.message || "Something went wrong during signing up");
    },
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await authClient.signIn.email({
        email,
        password,
      });
      if (res.error) throw new Error(res.error.message || "Failed to sign in");

      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.all,
      });
    },
    onError: (e) => {
      throw new Error(e.message || "Something went wrong during signing in");
    },
  });
};
