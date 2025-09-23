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

const index = 37;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D_qGpdQr.js')).default;
const server_id = "src/routes/user/dashboard/vehicles/[id]/delete/+page.server.ts";
const imports = ["_app/immutable/nodes/37.hkRXuLWw.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/BifvwZtI.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js"];
const stylesheets = ["_app/immutable/assets/37.DUUmCq-e.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=37-BjxSxpi0.js.map
