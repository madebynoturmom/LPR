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

const index = 23;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cs6vKDyu.js')).default;
const server_id = "src/routes/admin/dashboard/vehicles/create/+page.server.ts";
const imports = ["_app/immutable/nodes/23.CKwPnOKi.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/BBnkIoAR.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js","_app/immutable/chunks/BaSLTKbU.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/CsTGPyzP.js","_app/immutable/chunks/DSP_IF8R.js","_app/immutable/chunks/BnZ110ug.js","_app/immutable/chunks/Ct8xIc2f.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/BJbTcORX.js","_app/immutable/chunks/CdEA5IGF.js"];
const stylesheets = ["_app/immutable/assets/23.4FvRc58U.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=23-CFGllNz6.js.map
