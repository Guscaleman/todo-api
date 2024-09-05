import { ApiError } from "./api.errors";
import { JsonWebTokenError } from "jsonwebtoken";
import { BodyValidationError } from "./validation.errors";
import { NextFunction, Request, Response } from "express";

export function handleGlobalErrors(
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (error instanceof BodyValidationError) {
		return res.status(error.statusCode).json({ errors: error.errors });
	}
	if (error instanceof ApiError) {
		return res.status(error.statusCode).json({ message: error.message });
	}
	if (error instanceof JsonWebTokenError) {
		return res.status(401).json({ error: error.message });
	}
	console.log(error);
	return res.status(500).json({ error: "Internal server error" });
}
