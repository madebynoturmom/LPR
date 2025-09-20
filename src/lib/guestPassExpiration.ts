import 'dotenv/config';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './server/db/schema';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error('DATABASE_URL is not set');

const client = new Database(dbUrl);
const db = drizzle(client, { schema });

async function expireGuestPasses() {
  const now = new Date().toISOString();

  // Update guest passes that have expired
  await db.run(
    `UPDATE guest_pass SET status = 'expired' WHERE visit_time + duration_minutes * 60 <= strftime('%s', 'now') AND status != 'revoked'`
  );

  // Move expired guest passes to guest_pass_history
  await db.run(
    `INSERT INTO guest_pass_history (id, plate_number, visit_time, duration_minutes, status, user_id, type, revoked_at, name, phone)
     SELECT id, plate_number, visit_time, duration_minutes, 'expired', user_id, type, strftime('%s', 'now'), name, phone
     FROM guest_pass
     WHERE status = 'expired'`
  );

  // Remove expired guest passes from guest_pass table
  await db.run(
    `DELETE FROM guest_pass WHERE status = 'expired'`
  );
}

// Run expiration logic every minute
setInterval(expireGuestPasses, 60000);