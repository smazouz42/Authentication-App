import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(32),
});

export type SignIn = z.infer<typeof signInSchema>;
