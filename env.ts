import { z } from 'zod';
import 'dotenv/config';

const environmentSchema = z.object({
  TOKEN: z.string(),
  GUILD_ID: z.string(),
  DATABASE_URL: z.string().url().optional(),
})

const { TOKEN, GUILD_ID, DATABASE_URL } = process.env;

const parsedResults = environmentSchema.safeParse({
  TOKEN,
  GUILD_ID,
  DATABASE_URL,
})

if (!parsedResults.success) {
  console.error(parsedResults.error);
  throw new Error("Environment variables are not correctly set.")
}

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends z.infer<typeof environmentSchema> {}
  }
}