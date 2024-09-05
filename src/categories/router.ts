import { Router } from "express";
import { container } from "tsyringe";
import { validateBody } from "../@shared/validators";
import { isAuthenticated } from "../@shared/validators/isAuthenticated.validator";
import { CategoriesService } from "./services";
import { CategoriesController } from "./controller";
import { categoryCreateSchema } from "./schemas";
import { isCategoryOwner, validateCategoryId } from "./middlewares";

export const categoriesRouter = Router();

container.registerSingleton("CategoriesService", CategoriesService);
const categoriesController = container.resolve(CategoriesController);

categoriesRouter.post(
	"/",
	isAuthenticated,
	validateBody(categoryCreateSchema),
	(req, res) => categoriesController.create(req, res)
);
categoriesRouter.delete(
	"/:id",
	isAuthenticated,
	validateCategoryId,
	isCategoryOwner,
	(req, res) => categoriesController.deleteOne(req, res)
);
