import { z } from "zod";

export const registerSchema = z.object({
  firstname: z.string().min(5).max(50),
  lastname: z.string().min(5).max(50),
  email: z.string().email(),
  password: z.string().min(4).max(20),
  confirmpassword: z.string().min(4).max(20),
});

export type RegisterInputType = z.infer<typeof registerSchema>;
