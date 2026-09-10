import type { ListCategoryQuery } from "@cashory/schema";

export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    session: () => ["auth", "session"] as const,
    user: (id: string) => ["auth", "user", id] as const,
  },
  user: {
    all: ["user"] as const,
    profile: () => ["user", "profile"] as const,
    onboarding: () => ["user", "onboarding"] as const,
  },
  categories: {
    all: ["categories"] as const,
    list: (type?: "income" | "expense") =>
      ["categories", "list", type] as const,
  },
};
