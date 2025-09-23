import { d as db, i as vehicle, e as eq } from './index3-CPj-fGVF.js';
import 'dotenv/config';
import 'better-sqlite3';

function getUserIdFromSession(cookies) {
  return "R001";
}
const load = async ({ cookies }) => {
  const userId = getUserIdFromSession();
  const vehicles = await db.select().from(vehicle).where(eq(vehicle.ownerId, userId));
  return { vehicles };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 36;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CeJ1_Z_p.js')).default;
const server_id = "src/routes/user/dashboard/vehicles/+page.server.ts";
const imports = ["_app/immutable/nodes/36.DT8OPIOP.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/D3LgcHxc.js","_app/immutable/chunks/STPvjbMu.js","_app/immutable/chunks/BifvwZtI.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js"];
const stylesheets = ["_app/immutable/assets/36.Ciq5rAok.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=36-CvbZMhVb.js.map
