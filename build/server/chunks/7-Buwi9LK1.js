import { d as db, a as admin, e as eq, h as session } from './index3-DfwD5jMB.js';
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

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DHRI0Gck.js')).default;
const server_id = "src/routes/admin/dashboard/admins/+page.server.ts";
const imports = ["_app/immutable/nodes/7.BqCNP6vN.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/G6y-YXti.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/CYxAlzJ1.js","_app/immutable/chunks/BdvQLAZU.js","_app/immutable/chunks/g0qwyJPX.js","_app/immutable/chunks/BfIrQ_zr.js","_app/immutable/chunks/C80BVqqJ.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/Dr4jViYc.js","_app/immutable/chunks/Cko499XQ.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/BWorSmfV.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js"];
const stylesheets = ["_app/immutable/assets/7.DMSCsXDq.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-Buwi9LK1.js.map
