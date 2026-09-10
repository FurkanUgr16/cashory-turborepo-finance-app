import { type AppType } from "../../server/src/index";
import { hc } from "../../server/src/client";
import { env } from "@cashory/env/native";
import { authClient } from "./auth-client";

export const apiClient = hc<AppType>(env.EXPO_PUBLIC_SERVER_URL, {
  fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
    const cookie = await authClient.getCookie();

    const headers = new Headers(init?.headers);

    headers.set("Cookie", cookie);

    return fetch(input, { ...init, headers, credentials: "include" });
  },
});
