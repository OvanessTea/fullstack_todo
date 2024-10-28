import { z } from "zod";

// creating schema for todo item
const todoSchema = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    is_done: z.boolean()
});

export type ToDo = z.infer<typeof todoSchema>;