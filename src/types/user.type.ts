import { z } from "zod";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&._-]{8,}$/;

export const SignUpFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .regex(passwordRegex, {
      message: "Your password is not valid",
    }),
});
