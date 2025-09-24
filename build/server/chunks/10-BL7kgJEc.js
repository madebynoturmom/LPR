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
const component = async () => component_cache ??= (await import('./_page.svelte-CbEoZLSI.js')).default;
const server_id = "src/routes/admin/dashboard/guards/+page.server.ts";
const imports = ["_app/immutable/nodes/10.BfgIwCjH.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/BaSLTKbU.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/CsTGPyzP.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/DSP_IF8R.js","_app/immutable/chunks/BnZ110ug.js","_app/immutable/chunks/BrKrArgY.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/CdEA5IGF.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/BlJ0WHDZ.js","_app/immutable/chunks/BBnkIoAR.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-BL7kgJEc.js.map
