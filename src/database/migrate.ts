import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migrationClient = postgres(process.env.DATABASE_URL as string, {
  max: 1,
});

/*
  Drizzle will create a migration folder when migrating the first time.
  This folder will contain the SQL files that will be used to create the tables.
  Honestly, make the path whever you want, but I like to keep it in the src folder.
*/

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: './src/database/migrations',
  });

  await migrationClient.end();
}

main();
