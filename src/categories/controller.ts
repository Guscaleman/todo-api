import { Request, Response } from "express";
import { CategoriesService } from "./services";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoriesController {
	constructor(
		@inject("CategoriesService") private categoriesService: CategoriesService
	) {}

	public create = async (req: Request, res: Response) => {
		const categories = await this.categoriesService.create(
			req.body,
			+res.locals.jwtPayload.sub
		);

		return res.status(201).json(categories);
	};

	public deleteOne = async (req: Request, res: Response) => {
		await this.categoriesService.deleteOne(Number(req.params.id));

		return res.status(204).json();
	};
}
