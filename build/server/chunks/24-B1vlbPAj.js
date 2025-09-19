import { d as db, b as guestPass } from './index3-DE5iFVeB.js';
import { v4 } from 'uuid';
import { f as fail } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const plateNumber = form.get("plateNumber")?.toString();
    const durationMinutes = Number(form.get("durationMinutes"));
    if (!plateNumber || !durationMinutes) {
      return fail(400, { error: "All fields are required." });
    }
    try {
      await db.insert(guestPass).values({
        id: v4(),
        plateNumber,
        visitTime: /* @__PURE__ */ new Date(),
        durationMinutes
      });
      return { success: true };
    } catch (e) {
      return fail(500, { error: "Failed to create guest pass." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 24;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-P9nUAnSs.js')).default;
const server_id = "src/routes/user/dashboard/guests/create/+page.server.ts";
const imports = ["_app/immutable/nodes/24.TVgoni1t.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/Cpx9Zc3b.js","_app/immutable/chunks/D4Caz1gY.js","_app/immutable/chunks/p-fOG7Xz.js"];
const stylesheets = ["_app/immutable/assets/24.DQMNfiYJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=24-B1vlbPAj.js.map
