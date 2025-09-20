import { d as db, u as user, e as eq, g as guard, v as vehicle$1, a as admin, b as guestPass, c as eventLog, s as sql, f as and } from './index3-DTrFeyBm.js';
import 'dotenv/config';
import 'better-sqlite3';

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
    sql`SELECT strftime('%Y-%m-%d', datetime(visit_time, 'unixepoch')) as date, COUNT(*) as count FROM guest_pass WHERE visit_time >= strftime('%s', 'now', '-6 days') GROUP BY date ORDER BY date ASC;`
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

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-uYZm_C9P.js')).default;
const server_id = "src/routes/admin/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/5.CWDnK6zw.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DQtEjgo4.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/C26tcRC5.js","_app/immutable/chunks/DMSwwT4m.js","_app/immutable/chunks/DWyjkCdo.js","_app/immutable/chunks/CAznQZM0.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/CKdd3_oE.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/DSozhXEh.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js","_app/immutable/chunks/ZMIOfXK-.js"];
const stylesheets = ["_app/immutable/assets/5.D2A5auvc.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-BI6i7fPm.js.map
