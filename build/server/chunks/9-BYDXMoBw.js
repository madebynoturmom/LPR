import { d as db, g as guard, e as eq } from './index3-DTrFeyBm.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async () => {
  const guards = await db.select().from(guard);
  return { guards };
};
const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const name = form.get("name")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const guardId = form.get("guardId")?.toString().trim();
    if (!name || !phone || !guardId) {
      return fail(400, { error: "All fields are required." });
    }
    try {
      await db.insert(guard).values({
        username: guardId,
        name,
        phone,
        guardId
      });
      throw redirect(303, "/admin/dashboard/guards");
    } catch (e) {
      return fail(500, { error: "Failed to create guard." });
    }
  },
  delete: async ({ request }) => {
    const form = await request.formData();
    const id = form.get("id")?.toString();
    if (!id) return fail(400, { error: "Missing guard id" });
    try {
      await db.delete(guard).where(eq(guard.id, Number(id)));
      throw redirect(303, "/admin/dashboard/guards?deleted=1");
    } catch (e) {
      return fail(500, { error: "Failed to delete guard." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Do-qFr_N.js')).default;
const server_id = "src/routes/admin/dashboard/guards/+page.server.ts";
const imports = ["_app/immutable/nodes/9.BR-0mMtf.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DQtEjgo4.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/C26tcRC5.js","_app/immutable/chunks/D6O3RN6I.js","_app/immutable/chunks/DMSwwT4m.js","_app/immutable/chunks/DWyjkCdo.js","_app/immutable/chunks/ZHN8wxDx.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/CdEA5IGF.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/CzxUOqbp.js","_app/immutable/chunks/DSozhXEh.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js"];
const stylesheets = ["_app/immutable/assets/9.CYNzSrRu.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-BYDXMoBw.js.map
