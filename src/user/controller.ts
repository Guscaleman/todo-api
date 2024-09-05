import { UsersServices } from "./service";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class UsersController {
	constructor(@inject("UsersServices") private userServices: UsersServices) {}

	public register = async (req: Request, res: Response): Promise<Response> => {
		const newUser = await this.userServices.register(req.body);
		return res.status(201).json(newUser);
	};

	public login = async (req: Request, res: Response): Promise<Response> => {
		const response = await this.userServices.login(req.body);
		return res.status(200).json(response);
	};

	public getUser = async (req: Request, res: Response): Promise<Response> => {
		const { sub } = res.locals.jwtPayload;
		const response = await this.userServices.getUser(Number(sub));
		return res.status(200).json(response);
	};
}
