import { db } from '../src/lib/server/db/index.ts';
import { guestPass as guestPassTable, user } from '../src/lib/server/db/schema.ts';
import { v4 as uuidv4 } from 'uuid';

async function createGuestPass(plateNumber: string, visitTime: Date, durationMinutes: number) {
  const id = uuidv4();

  await db.insert(guestPassTable).values({
    id,
    plateNumber,
    visitTime,
    durationMinutes,
    status: 'active',
    userId: 'REPLACE_WITH_VALID_USER_ID' // Replace with an actual user ID string from your users table
  });

  console.log('Guest pass created:', id);

  // Schedule expiration logic
  setTimeout(async () => {
    const client = db.$client;

    client.prepare(
      `UPDATE guest_pass SET status = 'expired' WHERE id = ? AND status != 'revoked'`
    ).run(id);

    client.prepare(
      `INSERT INTO guest_pass_history (guest_id, pass_issued_at, pass_expires_at, status)
       SELECT id, visit_time, visit_time + duration_minutes * 60, 'expired'
       FROM guest_pass
       WHERE id = ? AND status = 'expired'`
    ).run(id);

    client.prepare(
      `DELETE FROM guest_pass WHERE id = ? AND status = 'expired'`
    ).run(id);

    console.log('Guest pass expired:', id);
  }, durationMinutes * 60 * 1000);
}

createGuestPass('ABC123', new Date(), 30).catch((err) => {
  console.error(err);
  process.exit(1);
});