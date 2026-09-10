import { type AppType } from "../../server/src/index";
import { hc } from "../../server/src/client";
import { env } from "@cashory/env/native";

export const apiClient = hc<AppType>(env.EXPO_PUBLIC_SERVER_URL);
