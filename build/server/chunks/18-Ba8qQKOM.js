import { d as db, i as vehicle, e as eq, u as user } from './index3-DfwD5jMB.js';
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

const index = 18;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CxPtmkis.js')).default;
const server_id = "src/routes/admin/dashboard/vehicles/+page.server.ts";
const imports = ["_app/immutable/nodes/18.dBqsdU9f.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/BdvQLAZU.js","_app/immutable/chunks/g0qwyJPX.js","_app/immutable/chunks/BfIrQ_zr.js","_app/immutable/chunks/C80BVqqJ.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/BWorSmfV.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js","_app/immutable/chunks/BvzuUZFe.js","_app/immutable/chunks/G6y-YXti.js","_app/immutable/chunks/CYxAlzJ1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=18-Ba8qQKOM.js.map
