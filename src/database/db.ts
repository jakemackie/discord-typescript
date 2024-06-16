import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL as string);

/*
 By exporting the db object, you can use it anywhere in your project.
 For example, you can use it in your commands to interact with the database.
*/
export const db = drizzle(client, { schema, logger: true });
