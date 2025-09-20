import { d as db, i as vehicle, e as eq } from './index3-DTrFeyBm.js';
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

const index = 28;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cq-3rXL8.js')).default;
const server_id = "src/routes/user/dashboard/vehicles/+page.server.ts";
const imports = ["_app/immutable/nodes/28.CMqDpNl0.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/D6O3RN6I.js","_app/immutable/chunks/DMSwwT4m.js","_app/immutable/chunks/DWyjkCdo.js","_app/immutable/chunks/DSozhXEh.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js"];
const stylesheets = ["_app/immutable/assets/28.Ciq5rAok.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=28-8Up9NgkZ.js.map
