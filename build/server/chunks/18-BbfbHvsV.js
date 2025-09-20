import { d as db, i as vehicle, e as eq, u as user } from './index3-Dp-zUSVy.js';
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

const index = 18;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-v-9bs60x.js')).default;
const server_id = "src/routes/admin/dashboard/vehicles/create/+page.server.ts";
const imports = ["_app/immutable/nodes/18.dX9td3q1.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/DQGvmDc0.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
const stylesheets = ["_app/immutable/assets/18.31Kf0vJD.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=18-BbfbHvsV.js.map
