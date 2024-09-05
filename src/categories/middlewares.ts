import { prisma } from "../database/prisma";
import { ApiError } from "../@shared/errors";
import { NextFunction, Request, Response } from "express";

export async function isCategoryOwner(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userId = +res.locals.jwtPayload.sub;

	const findCategoryId = await prisma.category.findFirst({
		where: { userId: userId },
	});

	if (!findCategoryId) {
		throw new ApiError("This user is not the category owner", 403);
	}

	return next();
}

export async function validateCategoryId(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const categoryId = +req.params.id;

	const findId = await prisma.category.findUnique({
		where: { id: categoryId },
	});

	if (!findId) {
		throw new ApiError("Category not found", 404);
	}

	next();
}
