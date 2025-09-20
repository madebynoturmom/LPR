import { d as db, i as vehicle, e as eq, u as user } from './index3-Dp-zUSVy.js';
import { f as fail } from './index-BmA2ZghE.js';
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
    return { success: true };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-WCLyCmo6.js')).default;
const server_id = "src/routes/admin/dashboard/vehicles/+page.server.ts";
const imports = ["_app/immutable/nodes/17.DnZ4FT3S.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/DQGvmDc0.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
const stylesheets = ["_app/immutable/assets/17.Csni5dJ0.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-DpiwoQRN.js.map
