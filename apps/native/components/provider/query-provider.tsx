import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

type Props = {
  children: React.ReactNode;
};

export function ReactQueryProvider({ children }: Props) {
  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      onlineManager.setOnline(
        !!state.isConnected && !!state.isInternetReachable,
      );
    });
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 100 * 60 * 5,
            retry: (failureCount, error) => {
              if (
                error instanceof Error &&
                error.message.includes("Network request failed")
              ) {
                return false;
              }
              return failureCount < 2;
            },
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
