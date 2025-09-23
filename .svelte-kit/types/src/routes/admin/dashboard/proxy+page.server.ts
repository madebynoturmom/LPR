// @ts-nocheck
import { db } from '$lib/server/db';
import { user, admin, guard, guestPass } from '$lib/server/db/schema';
import { vehicle } from '$lib/server/db/vehicle';
import { eventLog } from '$lib/server/db/event';
import { eq, sql, and } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  // Count residents as users with role 'resident'
  const [residents, guards, vehicles, users, admins, guests, events] = await Promise.all([
    db.select().from(user).where(eq(user.role, 'resident')),
    db.select().from(guard),
    db.select().from(vehicle),
    db.select().from(user),
    db.select().from(admin),
    db.select().from(guestPass),
    db.select().from(eventLog)
  ]);

  // Get guest stats for the last 7 days using Drizzle ORM SQL
  // Combine guest_pass and guest_pass_history so the chart includes both current and historical records
  const guestStatsRows = await db.all(
    sql`
      SELECT date, SUM(count) as count FROM (
        SELECT strftime('%Y-%m-%d', datetime(visit_time, 'unixepoch')) as date, COUNT(*) as count
        FROM guest_pass
        WHERE visit_time >= strftime('%s', 'now', '-6 days')
        GROUP BY date
        UNION ALL
        SELECT strftime('%Y-%m-%d', datetime(visit_time, 'unixepoch')) as date, COUNT(*) as count
        FROM guest_pass_history
        WHERE visit_time >= strftime('%s', 'now', '-6 days')
        GROUP BY date
      ) GROUP BY date ORDER BY date ASC;
    `
  );
  const guestStats = Array.isArray(guestStatsRows)
    ? guestStatsRows.map((row: any) => ({ date: row.date, count: Number(row.count) }))
    : [];

  // Get active guest passes (visitors) - get all active, then filter in JS
  const allActiveGuestPasses = await db.select().from(guestPass).where(
    and(
      eq(guestPass.status, 'active'),
      eq(guestPass.type, 'visitors')
    )
  );
  
  const now = Math.floor(Date.now() / 1000);
  const activeGuestPasses = allActiveGuestPasses.filter(pass => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1000);
    const expirationTime = visitTimeSeconds + (pass.durationMinutes * 60);
    return now < expirationTime;
  }).length;

  // Get active food delivery passes - get all active, then filter in JS
  const allActiveFoodDeliveryPasses = await db.select().from(guestPass).where(
    and(
      eq(guestPass.status, 'active'),
      eq(guestPass.type, 'food_delivery')
    )
  );
  
  const activeFoodDeliveryPasses = allActiveFoodDeliveryPasses.filter(pass => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1000);
    const expirationTime = visitTimeSeconds + (pass.durationMinutes * 60);
    return now < expirationTime;
  }).length;

  // Get recent car access (latest vehicle entry event)
  const recentCarAccessRows = await db.all(
    sql`SELECT details, timestamp FROM event_log WHERE type LIKE '%vehicle%' ORDER BY timestamp DESC LIMIT 1;`
  ) as { details: string; timestamp: number }[];
  const recentCarAccess = recentCarAccessRows[0] ? `${recentCarAccessRows[0].details} at ${new Date(recentCarAccessRows[0].timestamp * 1000).toLocaleString()}` : 'N/A';

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
    admins: admins.length,
    guests: guests.length,
    events: events.length,
    guestStats,
    activeGuestPasses,
    activeFoodDeliveryPasses,
    recentCarAccess,
    adminUsername,
    adminProfilePic
  };
};
