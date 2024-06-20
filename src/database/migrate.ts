import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import path from 'path';
import postgres from 'postgres';

// Create a PostgreSQL client for migrations with a maximum of 1 connection
const migrationClient = postgres(process.env.DATABASE_URL as string, {
  max: 1,
});

// Define your own migrations folder
const drizzleMigrationsFolder = path.join(__dirname, 'migrations');

/**
 * Function to handle database migrations.
 *
 * Drizzle will create a migration folder when migrating for the first time.
 * This folder will contain the SQL files that will be used to create the tables.
 */
async function DrizzleMigration(folder: string) {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: folder,
  });

  // Gracefully end the connection once the migrations are complete
  await migrationClient.end();
}

// Perform the database migrations!
DrizzleMigration(drizzleMigrationsFolder);
