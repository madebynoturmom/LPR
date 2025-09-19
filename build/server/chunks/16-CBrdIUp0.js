import { d as db, h as vehicle, e as eq, u as user } from './index3-DE5iFVeB.js';
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

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C2ZsxS2I.js')).default;
const server_id = "src/routes/admin/dashboard/vehicles/+page.server.ts";
const imports = ["_app/immutable/nodes/16.DzqgVgXI.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/DLge_FqR.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/BSmjIgV1.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js"];
const stylesheets = ["_app/immutable/assets/16.Csni5dJ0.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=16-CBrdIUp0.js.map
