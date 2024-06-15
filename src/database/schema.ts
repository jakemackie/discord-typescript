import { pgTable, varchar } from 'drizzle-orm/pg-core';

/*
 This is an example of a User table.
 https://orm.drizzle.team/docs/get-started-postgresql.
*/
export const UserTable = pgTable('user', {
  id: varchar('id', { length: 50 }).notNull().primaryKey(),
  username: varchar('username', { length: 50 }).notNull(),
});

// Define your own tables here...