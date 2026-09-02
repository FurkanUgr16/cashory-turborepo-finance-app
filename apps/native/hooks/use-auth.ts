import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: () => authClient.getSession(),
  });
}
