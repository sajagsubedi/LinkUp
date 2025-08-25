import z from "zod";

// --- Validation schema ---
export const signInSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInForm = z.infer<typeof signInSchema>;
