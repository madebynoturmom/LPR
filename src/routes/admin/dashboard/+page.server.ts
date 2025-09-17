import { db } from '$lib/server/db';
import { user, admin, guard, guestPass } from '$lib/server/db/schema';
import { vehicle } from '$lib/server/db/vehicle';
import { eventLog } from '$lib/server/db/event';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // Count residents as users with role 'resident'
  const [residents, guards, vehicles, users, guests, events] = await Promise.all([
    db.select().from(user).where(eq(user.role, 'resident')),
    db.select().from(guard),
    db.select().from(vehicle),
    db.select().from(user),
    db.select().from(guestPass),
    db.select().from(eventLog)
  ]);

  // Get guest stats for the last 7 days using Drizzle ORM SQL
  const guestStatsRows = await db.all(
    sql`SELECT strftime('%Y-%m-%d', datetime(visit_time, 'unixepoch')) as date, COUNT(*) as count FROM guest_pass WHERE visit_time >= strftime('%s', 'now', '-6 days') GROUP BY date ORDER BY date ASC;`
  );
  const guestStats = Array.isArray(guestStatsRows)
    ? guestStatsRows.map((row: any) => ({ date: row.date, count: Number(row.count) }))
    : [];

  // Get admin user info from admin table
  let adminUsername = '';
  let adminProfilePic = '';
  if (locals.user && locals.user.id) {
    const [adminRow] = await db.select().from(admin).where(eq(admin.id, locals.user.id));
    if (adminRow) {
      adminUsername = adminRow.username;
      adminProfilePic = adminRow.profilePic || '';
    }
  }

  return {
    residents: residents.length,
    guards: guards.length,
    vehicles: vehicles.length,
    users: users.length,
    guests: guests.length,
    events: events.length,
    guestStats,
    adminUsername,
    adminProfilePic
  };
};
