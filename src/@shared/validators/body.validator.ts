import { ZodSchema } from "zod";
import { BodyValidationError } from "../errors";
import { NextFunction, Request, Response } from "express";

export function validateBody(schema: ZodSchema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const parseResult = schema.safeParse(req.body);

		if (!parseResult.success) {
			throw new BodyValidationError(parseResult.error);
		}

		req.body = parseResult.data;

		next();
	};
}
