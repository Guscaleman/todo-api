import { Router } from "express";
import { container } from "tsyringe";
import { validateBody } from "../@shared/validators";
import { UsersServices } from "./service";
import { isAuthenticated } from "../@shared/validators/isAuthenticated.validator";
import { UsersController } from "./controller";
import { userLoginSchema, userRegisterSchema } from "./schemas";

export const usersRouter = Router();

container.registerSingleton("UsersServices", UsersServices);
const usersController = container.resolve(UsersController);

usersRouter.post("/", validateBody(userRegisterSchema), (req, res) =>
	usersController.register(req, res)
);
usersRouter.post("/login", validateBody(userLoginSchema), (req, res) =>
	usersController.login(req, res)
);
usersRouter.get("/profile", isAuthenticated, (req, res) =>
	usersController.getUser(req, res)
);
