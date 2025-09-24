import { d as db, a as admin, e as eq, s as session } from './index3-CPj-fGVF.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-aQ9ziOyl.js')).default;
const server_id = "src/routes/admin/dashboard/admins/+page.server.ts";
const imports = ["_app/immutable/nodes/7.Bt712ua2.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/BaSLTKbU.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/CsTGPyzP.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/DSP_IF8R.js","_app/immutable/chunks/BnZ110ug.js","_app/immutable/chunks/Ct8xIc2f.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/BrKrArgY.js","_app/immutable/chunks/DnwoYYiD.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/BBnkIoAR.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-97mtfAnd.js.map
