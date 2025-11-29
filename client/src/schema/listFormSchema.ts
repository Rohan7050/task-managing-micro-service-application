import { string, z } from "zod";

export const listSchema = z.object({
    name: z.string().min(5).max(20),
    desc: z.optional(string().min(5).max(20)),
});

export type ListFormType = z.infer<typeof listSchema>;
