import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import { d as db, u as user, e as eq } from './index3-Dp-zUSVy.js';
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
    const houseAddress = form.get("houseAddress")?.toString().trim();
    if (!name || !email || !phone || !carNumber || !houseAddress) {
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
        houseAddress
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

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-HAwjds7g.js')).default;
const server_id = "src/routes/admin/dashboard/residents/+page.server.ts";
const imports = ["_app/immutable/nodes/12.CibAHNSU.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/DQGvmDc0.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/D4Caz1gY.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
const stylesheets = ["_app/immutable/assets/12.CdzZ43dc.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-CplDezUD.js.map
