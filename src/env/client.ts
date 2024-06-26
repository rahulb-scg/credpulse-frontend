import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const publicEnv = createEnv({
  client: {
    NEXT_PUBLIC_API_BASE_URL: z
      .string()
      .url({ message: "NEXT_PUBLIC_API_BASE_URL must be a valid URL" }),
    NEXT_PUBLIC_API_BASE_URL_LOCAL: z
      .string()
      .url({ message: "NEXT_PUBLIC_API_BASE_URL_LOCAL must be a valid URL" }),

    NEXT_PUBLIC_AWS_ACCESS_KEY_ID: z.string().min(1, {
      message: "NEXT_PUBLIC_AWS_ACCESS_KEY_ID must be a non-empty string",
    }),
    NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY: z.string().min(1, {
      message: "NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY must be a non-empty string",
    }),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_API_BASE_URL_LOCAL: process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL,

    NEXT_PUBLIC_AWS_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,

    NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY:
      process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});
