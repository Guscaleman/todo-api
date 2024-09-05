import jwt from "jsonwebtoken";
import { parsedEnv } from "./env.config";

export function generateToken(payload: object = {}, userId: number) {
	const secret = parsedEnv.JWT_SECRET;

	return jwt.sign(payload, secret, {
		expiresIn: "12h",
		subject: String(userId),
	});
}

export function verifyToken(token: string) {
	const secret = parsedEnv.JWT_SECRET;

	const jwtPayload = jwt.verify(token, secret);

	return jwtPayload;
}
