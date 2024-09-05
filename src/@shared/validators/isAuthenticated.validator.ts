import { ApiError } from "../errors";
import { verifyToken } from "../../configs";
import { NextFunction, Request, Response } from "express";

export function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { authorization } = req.headers;

	if (!authorization) {
		throw new ApiError("Token is required", 401);
	}

	const [type, token] = authorization.split(" ");

	if (type !== "Bearer") {
		throw new ApiError("Missing token Bearer prefix", 401);
	}

	const jwtPayload = verifyToken(token);
	res.locals.jwtPayload = jwtPayload;

	return next();
}
