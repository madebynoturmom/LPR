import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import { d as db, u as user, e as eq } from './index3-DE5iFVeB.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async () => {
  const residents = await db.select().from(user).where(eq(user.role, "resident"));
  return { residents };
};
const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const carNumber = form.get("carNumber")?.toString().trim();
    const houseNumber = form.get("houseNumber")?.toString().trim();
    if (!name || !email || !phone || !carNumber || !houseNumber) {
      return fail(400, { error: "All fields are required." });
    }
    const username = email;
    const id = crypto.randomUUID();
    const passwordHash = "";
    try {
      await db.insert(user).values({
        id,
        username,
        passwordHash,
        role: "resident",
        name,
        email,
        phone,
        carNumber,
        houseNumber
      });
      throw redirect(303, "/admin/dashboard/residents");
    } catch (e) {
      return fail(500, { error: "Failed to create resident." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Dmr5mvI4.js')).default;
const server_id = "src/routes/admin/dashboard/residents/+page.server.ts";
const imports = ["_app/immutable/nodes/11.BA5XMrPd.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/DLge_FqR.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/D4Caz1gY.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/BSmjIgV1.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js"];
const stylesheets = ["_app/immutable/assets/11.CdzZ43dc.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=11-B_TKi6c_.js.map
