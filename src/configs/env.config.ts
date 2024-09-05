import { z } from "zod";

const envSchema = z.object({
	JWT_SECRET: z.string(),
	DATABASE_URL: z.string(),
});

function validateEnvVars() {
	const parseResult = envSchema.safeParse(process.env);

	if (!parseResult.success) {
		parseResult.error.errors.forEach(({ path, message }) => {
			return console.error(`Enviroment variable ${path}: ${message}`);
		});

		process.exit(1);
	}

	return parseResult.data;
}

export const parsedEnv = validateEnvVars();
