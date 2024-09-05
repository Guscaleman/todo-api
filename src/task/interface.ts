import { z } from "zod";
import { taskCreateSchema, taskSchema, taskUpdateSchema } from "./schemas";

export type Task = z.infer<typeof taskSchema>;
export type CreateTask = z.infer<typeof taskCreateSchema>;
export type UpdateTask = z.infer<typeof taskUpdateSchema>;
