import { d as db, i as vehicle, e as eq } from './index3-CPj-fGVF.js';
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

const index = 43;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BGqmtbZK.js')).default;
const server_id = "src/routes/user/dashboard/vehicles/create/+page.server.ts";
const imports = ["_app/immutable/nodes/43.C_djZOQv.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/BnZ110ug.js","_app/immutable/chunks/DnwoYYiD.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/BBnkIoAR.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js"];
const stylesheets = ["_app/immutable/assets/43.BQohetYN.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=43-DAScbeZ8.js.map
