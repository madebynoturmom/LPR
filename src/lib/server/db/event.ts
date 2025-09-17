import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const eventLog = sqliteTable('event_log', {
  id: text('id').primaryKey(),
  type: text('type').notNull(), // e.g. 'login', 'vehicle_entry', etc.
  userId: text('user_id'), // optional, can be null for system events
  details: text('details'),
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull()
});

export type EventLog = typeof eventLog.$inferSelect;
