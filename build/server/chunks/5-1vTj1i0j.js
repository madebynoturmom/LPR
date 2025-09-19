import { d as db, a as admin, e as eq, s as session } from './index3-DE5iFVeB.js';
import { f as fail } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async () => {
  const admins = await db.select().from(admin);
  return { admins };
};
const actions = {
  deleteAdmin: async (event) => {
    const form = await event.request.formData();
    const id = form.get("id");
    if (typeof id !== "string") return fail(400, { error: "Invalid admin ID" });
    await db.delete(session).where(eq(session.userId, id));
    await db.delete(admin).where(eq(admin.id, id));
    return { success: true };
  },
  updateAdmin: async (event) => {
    const form = await event.request.formData();
    const id = form.get("id");
    const username = form.get("username");
    if (typeof id !== "string" || typeof username !== "string") return fail(400, { error: "Invalid input" });
    await db.update(admin).set({ username }).where(eq(admin.id, id));
    return { success: true };
  },
  createAdmin: async (event) => {
    const form = await event.request.formData();
    const username = form.get("username");
    const passwordHash = form.get("passwordHash");
    if (typeof username !== "string" || typeof passwordHash !== "string") return fail(400, { error: "Invalid input" });
    await db.insert(admin).values({
      id: crypto.randomUUID(),
      username,
      passwordHash
    });
    return { success: true };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bq60Dl4I.js')).default;
const server_id = "src/routes/admin/dashboard/admins/+page.server.ts";
const imports = ["_app/immutable/nodes/5.Dk79XB6L.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/DLge_FqR.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/BSmjIgV1.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js"];
const stylesheets = ["_app/immutable/assets/5.MIloi5yZ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-1vTj1i0j.js.map
