import { z } from "zod";
import { categoryCreateSchema, categorySchema } from "./schemas";

export type Category = z.infer<typeof categorySchema>;
export type CategoryCreate = z.infer<typeof categoryCreateSchema>;
