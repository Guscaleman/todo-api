import { z } from "zod";

export const categorySchema = z.object({
	id: z.number().int().positive(),
	name: z.string(),
});

export const categoryCreateSchema = categorySchema.omit({ id: true });
