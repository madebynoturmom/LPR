import { d as db, i as vehicle, e as eq, u as user } from './index3-DTrFeyBm.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async () => {
  const vehiclesRaw = await db.select().from(vehicle).all();
  const users = await db.select().from(user).all();
  const userMap = Object.fromEntries(users.map((u) => [u.id, u]));
  const vehicles = vehiclesRaw.map((v) => ({
    ...v,
    ownerName: userMap[v.ownerId]?.name || userMap[v.ownerId]?.username || "-"
  }));
  return { vehicles, users };
};
const actions = {
  delete: async ({ request }) => {
    const form = await request.formData();
    const id = form.get("id")?.toString();
    if (!id) return fail(400, { error: "Missing vehicle ID." });
    await db.delete(vehicle).where(eq(vehicle.id, id));
    throw redirect(303, "/admin/dashboard/vehicles?deleted=1");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CxPtmkis.js')).default;
const server_id = "src/routes/admin/dashboard/vehicles/+page.server.ts";
const imports = ["_app/immutable/nodes/17.gwOTnLEH.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/D6O3RN6I.js","_app/immutable/chunks/DMSwwT4m.js","_app/immutable/chunks/DWyjkCdo.js","_app/immutable/chunks/CAznQZM0.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/DSozhXEh.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js","_app/immutable/chunks/ZMIOfXK-.js","_app/immutable/chunks/DQtEjgo4.js","_app/immutable/chunks/C26tcRC5.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-D-a1c8f_.js.map
