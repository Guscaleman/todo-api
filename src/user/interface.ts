import { z } from "zod";
import {
	userLoginSchema,
	userRegisterSchema,
	userSchema,
	userWithoutPasswordSchema,
} from "./schemas";

export type User = z.infer<typeof userSchema>;
export type UserRegister = z.infer<typeof userRegisterSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type UserRegisterReturn = z.infer<typeof userWithoutPasswordSchema>;
export type UserLoginReturn = {
	accessToken: string;
	user: UserRegisterReturn;
};
