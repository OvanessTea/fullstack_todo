import { z } from "zod";

// creating schema for todo item
const taskSchema = z.object({
    _id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    is_done: z.boolean(),
});

const deleteSchema = z.function().args(z.string()).returns(z.void());
const addSchema = z.function().args(taskSchema).returns(taskSchema);
const patchSchema = z.function().args(taskSchema).returns(taskSchema);

export type TaskModel = z.infer<typeof taskSchema>;
export type DeleteTaskModel = z.infer<typeof deleteSchema>;
export type AddTaskModel = z.infer<typeof addSchema>;
export type PatchTaskModel = z.infer<typeof patchSchema>;