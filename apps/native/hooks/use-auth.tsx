import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { queryKeys } from "@/lib/query-keys";
import { UpdateProfileData } from "@/lib/api-types";
import { error } from "better-auth/api";

export const useAuthSession = () => {
  return useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: async () => await authClient.getSession(),
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
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await authClient.signOut();

      if (res.error) throw new Error(res.error.message || "Failed to sign out");

      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.all,
      });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const { country, image, name, phone } = data;
      const res = await authClient.updateUser({
        country: country?.name,
        image,
        name,
        phone,
      });

      if (res.error)
        throw new Error(res.error.message || "Failed to update profile");

      return res.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.session(),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.user.profile(),
      });
    },
  });
};

export const useCompleteOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await authClient.updateUser({
        onBoardingCompleted: true,
      });

      if (res.error)
        throw new Error(res.error.message || "Failed to complete onboarding");

      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.session(),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.user.onboarding(),
      });
    },
  });
};
