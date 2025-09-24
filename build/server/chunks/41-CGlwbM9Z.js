import { d as db, i as vehicle, e as eq } from './index3-CPj-fGVF.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async ({ params, locals }) => {
  const user = locals.user;
  if (!user) throw redirect(303, "/login");
  const { id } = params;
  const vehicles = await db.select().from(vehicle).where(eq(vehicle.id, id));
  if (!vehicles.length) throw redirect(303, "/user/dashboard/vehicles");
  const vehicle$1 = vehicles[0];
  if (vehicle$1.ownerId !== user.id) throw redirect(303, "/user/dashboard/vehicles");
  return { vehicle: vehicle$1 };
};
const actions = {
  default: async ({ params, locals }) => {
    console.log("Delete action triggered");
    const user = locals.user;
    console.log("User from locals:", user);
    if (!user) {
      console.error("Authentication failed: No user");
      return fail(401, { error: "Not authenticated." });
    }
    const { id } = params;
    console.log("Vehicle ID to delete:", id);
    try {
      await db.delete(vehicle).where(eq(vehicle.id, id));
      console.log("Vehicle deleted successfully:", id);
      return { success: true };
    } catch (e) {
      console.error("Error deleting vehicle:", e);
      return fail(500, { error: "Failed to delete vehicle." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 41;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-uvfq8Juy.js')).default;
const server_id = "src/routes/user/dashboard/vehicles/[id]/delete/+page.server.ts";
const imports = ["_app/immutable/nodes/41.DO_Dys5z.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/BBnkIoAR.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js"];
const stylesheets = ["_app/immutable/assets/41.DUUmCq-e.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=41-CGlwbM9Z.js.map
