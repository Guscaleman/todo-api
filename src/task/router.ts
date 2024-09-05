import { Router } from "express";
import { container } from "tsyringe";
import { isTaskOwner } from "../user/middlewares";
import { validateBody } from "../@shared/validators";
import { TasksService } from "./service";
import { validateTaskId } from "./middlewares";
import { isAuthenticated } from "../@shared/validators/isAuthenticated.validator";
import { TasksController } from "./controller";
import { taskCreateSchema, taskUpdateSchema } from "./schemas";

export const tasksRouter = Router();

container.registerSingleton("TasksService", TasksService);
const tasksController = container.resolve(TasksController);

tasksRouter.post(
	"/",
	isAuthenticated,
	validateBody(taskCreateSchema),
	(req, res) => tasksController.create(req, res)
);
tasksRouter.get("/", isAuthenticated, (req, res) =>
	tasksController.findAll(req, res)
);
tasksRouter.get("/:id", isAuthenticated, validateTaskId, (req, res) =>
	tasksController.findOne(req, res)
);
tasksRouter.patch(
	"/:id",
	isAuthenticated,
	validateTaskId,
	isTaskOwner,
	validateBody(taskUpdateSchema),
	(req, res) => tasksController.updateOne(req, res)
);
tasksRouter.delete(
	"/:id",
	isAuthenticated,
	validateTaskId,
	isTaskOwner,
	(req, res) => tasksController.deleteOne(req, res)
);
