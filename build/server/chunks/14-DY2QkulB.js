import { d as db, u as user, e as eq } from './index3-Dp-zUSVy.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async ({ params }) => {
  const id = params.id;
  const resident = await db.select().from(user).where(eq(user.id, id)).then((rows) => rows[0]);
  return { resident };
};
const actions = {
  default: async ({ request, params }) => {
    const form = await request.formData();
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const carNumber = form.get("carNumber")?.toString().trim();
    const houseAddress = form.get("houseAddress")?.toString().trim();
    if (!name || !email || !phone || !carNumber || !houseAddress) {
      return fail(400, { error: "All fields are required." });
    }
    try {
      await db.update(user).set({ name, email, phone, carNumber, houseAddress }).where(eq(user.id, params.id));
      throw redirect(303, "/admin/dashboard/residents");
    } catch (e) {
      return fail(500, { error: "Failed to update resident." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 14;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-ERw61njZ.js')).default;
const server_id = "src/routes/admin/dashboard/residents/[id]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/14.FzKC5DwO.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
const stylesheets = ["_app/immutable/assets/14.DNPrmxmj.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=14-DY2QkulB.js.map
