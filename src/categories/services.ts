import { prisma } from "../database/prisma";
import { ApiError } from "../@shared/errors";
import { injectable } from "tsyringe";
import { CategoryCreate } from "./interface";

@injectable()
export class CategoriesService {
	public create = async (body: CategoryCreate, userId: number) => {
		const newCategory = await prisma.category.create({
			data: { ...body, userId },
		});

		return newCategory;
	};

	public findOne = async (id: number) => {
		const category = await prisma.category.findUnique({ where: { id } });
		if (!category) {
			throw new ApiError("Category not found", 404);
		}
		return category;
	};

	public deleteOne = async (id: number) => {
		await this.findOne(id);
		await prisma.category.delete({ where: { id } });
	};
}
