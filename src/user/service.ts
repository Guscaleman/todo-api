import bcrypt from "bcryptjs";
import { prisma } from "../database/prisma";
import { ApiError } from "../@shared/errors";
import { injectable } from "tsyringe";
import { generateToken } from "../configs";
import { userWithoutPasswordSchema } from "./schemas";
import {
	UserLogin,
	UserLoginReturn,
	UserRegister,
	UserRegisterReturn,
} from "./interface";

@injectable()
export class UsersServices {
	async findByEmail(email: string) {
		const account = prisma.user.findUnique({ where: { email } });

		return account;
	}

	async register(body: UserRegister): Promise<UserRegisterReturn> {
		const isEmailValid = await this.findByEmail(body.email);

		if (isEmailValid) {
			throw new ApiError("This email is already registered", 409);
		}

		body.password = await bcrypt.hash(body.password, 10);
		const newUser = await prisma.user.create({ data: body });

		return userWithoutPasswordSchema.parse(newUser);
	}

	async login(body: UserLogin): Promise<UserLoginReturn> {
		const user = await prisma.user.findFirst({ where: { email: body.email } });

		if (!user) {
			throw new ApiError("User not exists", 404);
		}

		const compare = await bcrypt.compare(body.password, user.password);

		if (!compare) {
			throw new ApiError("Email and password doesn't match", 401);
		}

		const token = generateToken({}, user.id);

		return {
			accessToken: token,
			user: userWithoutPasswordSchema.parse(user),
		};
	}

	async getUser(id: number): Promise<UserRegisterReturn> {
		const user = await prisma.user.findUnique({ where: { id } });

		return userWithoutPasswordSchema.parse(user);
	}
}
