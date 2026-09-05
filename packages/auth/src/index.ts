import { expo } from "@better-auth/expo";
import { createDb } from "@cashory/db";
import * as schema from "@cashory/db/schema/auth";
import { env } from "@cashory/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const createAuth = () => {
  const db = createDb();

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",

      schema: schema,
    }),
    trustedOrigins: [
      env.CORS_ORIGIN,

      "cashory://",
      "exp://*",
      "http://localhost:8081",
    ],
    emailAndPassword: {
      enabled: true,
    },
    user: {
      additionalFields: {
        onBoardingCompleted: {
          type: "boolean",
          required: false,
          input: true,
        },
        country: {
          type: "string",
          required: false,
          input: true,
        },
        phone: {
          type: "string",
          required: false,
          input: true,
        },
        image: {
          type: "string",
          required: false,
          input: true,
        },
        currnecy: {
          type: "string",
          required: false,
          input: true,
        },
      },
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      },
    },
    plugins: [expo()],
  });
};

export const auth = createAuth();
