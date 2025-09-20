import { d as db, i as vehicle, e as eq } from './index3-Dp-zUSVy.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-su2JP5gV.js')).default;
const server_id = "src/routes/user/dashboard/vehicles/+page.server.ts";
const imports = ["_app/immutable/nodes/28.CpC2srdd.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/DQGvmDc0.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
const stylesheets = ["_app/immutable/assets/28.Ciq5rAok.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=28-B344v2rx.js.map
