import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(20),
});

export type LoginInputType = z.infer<typeof loginSchema>;
