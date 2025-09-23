import { d as db, u as user, e as eq, g as guard, v as vehicle$1, a as admin, c as guestPass, b as eventLog, f as sql, h as and } from './index3-CPj-fGVF.js';

const load = async ({ locals }) => {
  const [residents, guards, vehicles, users, admins, guests, events] = await Promise.all([
    db.select().from(user).where(eq(user.role, "resident")),
    db.select().from(guard),
    db.select().from(vehicle$1),
    db.select().from(user),
    db.select().from(admin),
    db.select().from(guestPass),
    db.select().from(eventLog)
  ]);
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
  const guestStats = Array.isArray(guestStatsRows) ? guestStatsRows.map((row) => ({ date: row.date, count: Number(row.count) })) : [];
  const allActiveGuestPasses = await db.select().from(guestPass).where(
    and(
      eq(guestPass.status, "active"),
      eq(guestPass.type, "visitors")
    )
  );
  const now = Math.floor(Date.now() / 1e3);
  const activeGuestPasses = allActiveGuestPasses.filter((pass) => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1e3);
    const expirationTime = visitTimeSeconds + pass.durationMinutes * 60;
    return now < expirationTime;
  }).length;
  const allActiveFoodDeliveryPasses = await db.select().from(guestPass).where(
    and(
      eq(guestPass.status, "active"),
      eq(guestPass.type, "food_delivery")
    )
  );
  const activeFoodDeliveryPasses = allActiveFoodDeliveryPasses.filter((pass) => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1e3);
    const expirationTime = visitTimeSeconds + pass.durationMinutes * 60;
    return now < expirationTime;
  }).length;
  const recentCarAccessRows = await db.all(
    sql`SELECT details, timestamp FROM event_log WHERE type LIKE '%vehicle%' ORDER BY timestamp DESC LIMIT 1;`
  );
  const recentCarAccess = recentCarAccessRows[0] ? `${recentCarAccessRows[0].details} at ${new Date(recentCarAccessRows[0].timestamp * 1e3).toLocaleString()}` : "N/A";
  let adminUsername = "";
  let adminProfilePic = "";
  if (locals.user && locals.user.id) {
    const [adminRow] = await db.select().from(admin).where(eq(admin.id, locals.user.id));
    if (adminRow) {
      adminUsername = adminRow.username;
      adminProfilePic = adminRow.profilePic || "";
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

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

export { _page_server_ts as _, load as l };
//# sourceMappingURL=_page.server.ts-BdOABsND.js.map
