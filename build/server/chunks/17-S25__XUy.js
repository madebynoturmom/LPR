import { d as db, h as vehicle, u as user } from './index3-DE5iFVeB.js';
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
    await db.insert(vehicle).values({
      id: v4(),
      plateNumber,
      ownerId,
      model,
      makeYear
    });
    throw redirect(303, "/admin/dashboard/vehicles");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BHL-jTma.js')).default;
const server_id = "src/routes/admin/dashboard/vehicles/create/+page.server.ts";
const imports = ["_app/immutable/nodes/17.ClOhcHf2.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/DLge_FqR.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/BSmjIgV1.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js"];
const stylesheets = ["_app/immutable/assets/17.31Kf0vJD.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-S25__XUy.js.map
