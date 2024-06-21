import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import path from 'path';
import postgres from 'postgres';

const migrationClient = postgres(process.env.DATABASE_URL as string, {
  max: 1,
});

/**
 * Function to handle database migrations.
 *
 * Drizzle will create a migration folder when migrating for the first time.
 * @param folder - The folder containing the migration files.
 * @returns - A promise that resolves when the migrations are complete.
 */
async function drizzleMigration(folder: string) {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: folder,
  });

  return await migrationClient.end();
}

const drizzleMigrationsFolder = path.join(__dirname, 'migrations');

drizzleMigration(drizzleMigrationsFolder);
