import "express-async-errors";
import "reflect-metadata";
import helmet from "helmet";
import cors from "cors";
import { tasksRouter } from "./task";
import { usersRouter } from "./user";
import express, { json } from "express";
import { categoriesRouter } from "./categories";
import { handleGlobalErrors } from "./@shared/errors";

export const app = express();

app.use(helmet());

app.use(cors());

app.use(json());

app.use("/tasks", tasksRouter);
app.use("/categories", categoriesRouter);
app.use("/users", usersRouter);

app.use(handleGlobalErrors);
