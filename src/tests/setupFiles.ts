import supertest from "supertest";
import { app } from "../app";
import { prisma } from "../database/prisma";
import { beforeEach } from "vitest";

export const request = supertest(app);

beforeEach(async () => {
	await prisma.$transaction([
		prisma.user.deleteMany(),
		prisma.category.deleteMany(),
		prisma.task.deleteMany(),
	]);
});
