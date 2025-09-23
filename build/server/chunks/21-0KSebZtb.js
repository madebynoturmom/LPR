import { d as db, i as vehicle, e as eq, u as user } from './index3-CPj-fGVF.js';
import { v4 } from 'uuid';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async () => {
  const allUsers = await db.select().from(user).all();
  const users = allUsers.filter((u) => u.role === "resident");
  return { users };
};
const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const plateNumber = form.get("plateNumber")?.toString().trim();
    const ownerId = form.get("ownerId")?.toString();
    const model = form.get("model")?.toString();
    const makeYear = Number(form.get("makeYear"));
    if (!plateNumber || !ownerId || !model || !makeYear) {
      return fail(400, { error: "All fields are required." });
    }
    const existingVehicle = await db.select().from(vehicle).where(eq(vehicle.plateNumber, plateNumber)).get();
    if (existingVehicle) {
      return fail(400, { error: "A vehicle with this plate number already exists." });
    }
    try {
      await db.insert(vehicle).values({
        id: v4(),
        plateNumber,
        ownerId,
        model,
        makeYear
      });
    } catch (e) {
      return fail(500, { error: "Failed to add vehicle." });
    }
    throw redirect(303, "/admin/dashboard/vehicles");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 21;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C_AKLK3q.js')).default;
const server_id = "src/routes/admin/dashboard/vehicles/create/+page.server.ts";
const imports = ["_app/immutable/nodes/21.CmVbxE06.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/D3LgcHxc.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/BifvwZtI.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=21-0KSebZtb.js.map
