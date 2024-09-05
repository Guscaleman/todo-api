import { z } from "zod";

export const userSchema = z.object({
	id: z.number().positive(),
	name: z.string().min(1).max(20),
	email: z.string().min(1).email(),
	password: z.string().min(4),
});

export const userRegisterSchema = userSchema.omit({ id: true });

export const userLoginSchema = userSchema.pick({ email: true, password: true });

export const userWithoutPasswordSchema = userSchema.omit({ password: true });
