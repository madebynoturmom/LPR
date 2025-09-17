import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const vehicle = sqliteTable('vehicle', {
  id: text('id').primaryKey(),
  plateNumber: text('plate_number').notNull().unique(),
  ownerId: text('owner_id').notNull(), // FK to user.id
  model: text('model').notNull(),
  makeYear: integer('make_year').notNull(),
});

export type Vehicle = typeof vehicle.$inferSelect;
