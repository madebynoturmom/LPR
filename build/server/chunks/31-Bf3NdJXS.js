import { d as db, i as vehicle, e as eq } from './index3-Dp-zUSVy.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import { v4 } from 'uuid';
import 'dotenv/config';
import 'better-sqlite3';

const actions = {
  default: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) return fail(401, { error: "Not authenticated." });
    const form = await request.formData();
    const model = form.get("model")?.toString();
    const makeYear = Number(form.get("makeYear"));
    const plateNumber = form.get("plateNumber")?.toString();
    if (!model || !makeYear || !plateNumber) {
      return fail(400, { error: "All fields are required." });
    }
    const existingVehicle = await db.select().from(vehicle).where(eq(vehicle.plateNumber, plateNumber)).get();
    if (existingVehicle) {
      return fail(400, { error: "A vehicle with this plate number already exists." });
    }
    try {
      await db.insert(vehicle).values({
        id: v4(),
        model,
        makeYear,
        plateNumber,
        ownerId: user.id
      });
    } catch (e) {
      return fail(500, { error: "Failed to add vehicle." });
    }
    throw redirect(303, "/user/dashboard/vehicles");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 31;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DcNwddnd.js')).default;
const server_id = "src/routes/user/dashboard/vehicles/create/+page.server.ts";
const imports = ["_app/immutable/nodes/31.DOf4thkl.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/CBdOqptF.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
const stylesheets = ["_app/immutable/assets/31.BQohetYN.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=31-Bf3NdJXS.js.map
