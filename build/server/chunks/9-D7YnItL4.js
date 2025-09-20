import { d as db, g as guard } from './index3-Dp-zUSVy.js';
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
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-SAKpRsqg.js')).default;
const server_id = "src/routes/admin/dashboard/guards/+page.server.ts";
const imports = ["_app/immutable/nodes/9.CluZ12dP.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/DQGvmDc0.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
const stylesheets = ["_app/immutable/assets/9.Wa_G3UM1.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-D7YnItL4.js.map
