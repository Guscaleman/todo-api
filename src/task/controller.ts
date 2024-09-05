import { TasksService } from "./service";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class TasksController {
	constructor(@inject("TasksService") private tasksService: TasksService) {}

	public create = async (req: Request, res: Response) => {
		const task = await this.tasksService.create(
			req.body,
			+res.locals.jwtPayload.sub
		);

		return res.status(201).json(task);
	};

	public findAll = async (req: Request, res: Response) => {
		const name = req.query.category ? String(req.query.category) : undefined;
		const tasks = await this.tasksService.findAll(
			name,
			+res.locals.jwtPayload.sub
		);

		return res.json(tasks);
	};

	public findOne = async (req: Request, res: Response) => {
		const task = await this.tasksService.findTask(Number(req.params.id));

		return res.status(200).json(task);
	};

	public updateOne = async (req: Request, res: Response) => {
		const task = await this.tasksService.updateOne(
			Number(req.params.id),
			req.body
		);

		return res.status(200).json(task);
	};

	public deleteOne = async (req: Request, res: Response) => {
		await this.tasksService.deleteOne(Number(req.params.id));

		return res.status(204).json();
	};
}
