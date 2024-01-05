import { z } from "zod";
import { signInSchema } from "./sign-in";

export const signUpSchema = signInSchema.merge(
  z.object({
    username: z.string().min(4).max(24),
  })
);


export type SignUp = z.infer<typeof signUpSchema>;