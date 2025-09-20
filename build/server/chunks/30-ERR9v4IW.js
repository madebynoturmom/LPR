import { d as db, i as vehicle, e as eq } from './index3-DTrFeyBm.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

function getUserIdFromSession(cookies) {
  return "R001";
}
const load = async ({ params, cookies }) => {
  const userId = getUserIdFromSession();
  const { id } = params;
  const vehicles = await db.select().from(vehicle).where(eq(vehicle.id, id));
  if (!vehicles.length) throw redirect(303, "/user/dashboard/vehicles");
  const vehicle$1 = vehicles[0];
  if (vehicle$1.ownerId !== userId) throw redirect(303, "/user/dashboard/vehicles");
  return { vehicle: vehicle$1 };
};
const actions = {
  default: async ({ request, params, cookies }) => {
    const { id } = params;
    const form = await request.formData();
    const model = form.get("model")?.toString();
    const makeYear = Number(form.get("makeYear"));
    const plateNumber = form.get("plateNumber")?.toString();
    if (!model || !makeYear || !plateNumber) {
      return fail(400, { error: "All fields are required." });
    }
    try {
      await db.update(vehicle).set({ model, makeYear, plateNumber }).where(eq(vehicle.id, id));
      return { success: true };
    } catch (e) {
      return fail(500, { error: "Failed to update vehicle." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 30;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BP9L7RV0.js')).default;
const server_id = "src/routes/user/dashboard/vehicles/[id]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/30.5gluLuE0.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/D6O3RN6I.js","_app/immutable/chunks/DWyjkCdo.js","_app/immutable/chunks/Btu2CQ7A.js","_app/immutable/chunks/CdEA5IGF.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/DSozhXEh.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js"];
const stylesheets = ["_app/immutable/assets/30.BXnW_C-f.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=30-ERR9v4IW.js.map
