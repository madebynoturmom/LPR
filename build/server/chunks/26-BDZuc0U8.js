import { d as db, h as vehicle, e as eq } from './index3-DE5iFVeB.js';
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

const index = 26;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DizNl2mp.js')).default;
const server_id = "src/routes/user/dashboard/vehicles/+page.server.ts";
const imports = ["_app/immutable/nodes/26.CcDJKlpe.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/DLge_FqR.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/BSmjIgV1.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js"];
const stylesheets = ["_app/immutable/assets/26.Ciq5rAok.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=26-BDZuc0U8.js.map
