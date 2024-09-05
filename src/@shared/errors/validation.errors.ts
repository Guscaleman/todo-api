import { ZodError } from "zod";

export class BodyValidationError extends ZodError {
	constructor(
		public error: ZodError,
		public readonly statusCode: number = 400
	) {
		super(error.errors);
	}
}
