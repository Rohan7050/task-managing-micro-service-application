import {z} from "zod";

export const boardFormSchema = z.object({
    name: z.string().min(4).max(20),
    desc: z.string()
})

export type BoardFormType = z.infer<typeof boardFormSchema>;