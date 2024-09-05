import { prisma } from "../database/prisma";
import { ApiError } from "../@shared/errors";
import { NextFunction, Request, Response } from "express";

export async function isTaskOwner(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userId = +res.locals.jwtPayload.sub;

	const findId = await prisma.task.findFirst({
		where: { userId: userId },
	});

	if (!findId) {
		throw new ApiError("This user is not the task owner", 403);
	}

	return next();
}
