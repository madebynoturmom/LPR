import { d as db, u as user, e as eq, g as guard, v as vehicle$1, b as guestPass, c as eventLog, f as sql, a as admin } from './index3-DE5iFVeB.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async ({ locals }) => {
  const [residents, guards, vehicles, users, guests, events] = await Promise.all([
    db.select().from(user).where(eq(user.role, "resident")),
    db.select().from(guard),
    db.select().from(vehicle$1),
    db.select().from(user),
    db.select().from(guestPass),
    db.select().from(eventLog)
  ]);
  const guestStatsRows = await db.all(
    sql`SELECT strftime('%Y-%m-%d', datetime(visit_time, 'unixepoch')) as date, COUNT(*) as count FROM guest_pass WHERE visit_time >= strftime('%s', 'now', '-6 days') GROUP BY date ORDER BY date ASC;`
  );
  const guestStats = Array.isArray(guestStatsRows) ? guestStatsRows.map((row) => ({ date: row.date, count: Number(row.count) })) : [];
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
    guests: guests.length,
    events: events.length,
    guestStats,
    adminUsername,
    adminProfilePic
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BEi7lY8e.js')).default;
const server_id = "src/routes/admin/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/4.Da85DQom.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/DJtz8HCy.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CmkkP05h.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/DLge_FqR.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/DopBa8lt.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/BSmjIgV1.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js"];
const stylesheets = ["_app/immutable/assets/4.CQEeNlbe.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-Cy8D3wpo.js.map
