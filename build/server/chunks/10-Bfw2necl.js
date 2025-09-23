import { d as db, g as guard, e as eq } from './index3-CPj-fGVF.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import { e as encodeHexLowerCase, s as sha256 } from './hex-C-thOhOU.js';
import './base64-EEv6AAhc.js';
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
      const defaultHash = encodeHexLowerCase(sha256(new TextEncoder().encode(guardId)));
      await db.insert(guard).values({
        username: guardId,
        name,
        phone,
        guardId,
        passwordHash: defaultHash
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

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BV7oXmPf.js')).default;
const server_id = "src/routes/admin/dashboard/guards/+page.server.ts";
const imports = ["_app/immutable/nodes/10.Cu9ExiM-.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/BQQlMUYl.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/D5ruwRzR.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/D3LgcHxc.js","_app/immutable/chunks/STPvjbMu.js","_app/immutable/chunks/CBbLTMDG.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/CdEA5IGF.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/CSwq9K3f.js","_app/immutable/chunks/BifvwZtI.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-Bfw2necl.js.map
