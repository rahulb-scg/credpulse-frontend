import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const secretEnv = createEnv({
  server: {
    NEXTAUTH_URL: z
      .string()
      .url({ message: "NEXTAUTH_URL must be a valid URL" }),
    NEXTAUTH_SECRET: z
      .string()
      .min(1, { message: "NEXTAUTH_SECRET must be a non-empty string" }),

    COGNITO_CLIENT_ID: z
      .string()
      .min(1, { message: "COGNITO_CLIENT_ID must be a non-empty string" }),
    COGNITO_ISSUER: z
      .string()
      .url({ message: "COGNITO_ISSUER must be a valid URL" }),
    COGNITO_CLIENT_SECRET: z
      .string()
      .min(1, { message: "COGNITO_CLIENT_SECRET must be a non-empty string" }),

    GOOGLE_CLIENT_ID: z
      .string()
      .min(1, { message: "GOOGLE_CLIENT_ID must be a non-empty string" }),
    GOOGLE_CLIENT_SECRET: z
      .string()
      .min(1, { message: "GOOGLE_CLIENT_SECRET must be a non-empty string" }),
  },
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
    COGNITO_ISSUER: process.env.COGNITO_ISSUER,
    COGNITO_CLIENT_SECRET: process.env.COGNITO_CLIENT_SECRET,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
});
