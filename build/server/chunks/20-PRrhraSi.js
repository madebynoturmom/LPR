import { d as db, i as vehicle, e as eq, u as user } from './index3-CPj-fGVF.js';
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

const index = 20;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-ka2Jk9PS.js')).default;
const server_id = "src/routes/admin/dashboard/vehicles/+page.server.ts";
const imports = ["_app/immutable/nodes/20.BDJBjqEs.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/D3LgcHxc.js","_app/immutable/chunks/STPvjbMu.js","_app/immutable/chunks/DbZgNqix.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/BifvwZtI.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js","_app/immutable/chunks/tN8zdOQx.js","_app/immutable/chunks/BQQlMUYl.js","_app/immutable/chunks/D5ruwRzR.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=20-PRrhraSi.js.map
