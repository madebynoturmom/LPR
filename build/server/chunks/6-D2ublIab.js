import { d as db, a as admin, e as eq, h as session } from './index3-DTrFeyBm.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
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
    throw redirect(303, "/admin/dashboard/admins?deleted=1");
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

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DHRI0Gck.js')).default;
const server_id = "src/routes/admin/dashboard/admins/+page.server.ts";
const imports = ["_app/immutable/nodes/6.BX2OrApR.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DQtEjgo4.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/C26tcRC5.js","_app/immutable/chunks/D6O3RN6I.js","_app/immutable/chunks/DMSwwT4m.js","_app/immutable/chunks/DWyjkCdo.js","_app/immutable/chunks/CAznQZM0.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/ZHN8wxDx.js","_app/immutable/chunks/Btu2CQ7A.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/DSozhXEh.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js"];
const stylesheets = ["_app/immutable/assets/6.DMSCsXDq.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-D2ublIab.js.map
