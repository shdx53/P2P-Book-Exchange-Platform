import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(6, "Username must be at least 6 characters long")
    .transform((value) => value?.trim()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .transform((value) => value?.trim()),
});
