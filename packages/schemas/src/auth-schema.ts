import z from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(1),
  email: z.email(),
  password: z.string().trim().min(8),
});

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().trim().min(8),
});

export type SignUpType = z.infer<typeof signupSchema>;
export type SignInType = z.infer<typeof signinSchema>;
