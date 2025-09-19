import { d as db, b as guestPass, e as eq } from './index3-DE5iFVeB.js';
import { v4 } from 'uuid';
import { f as fail } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async () => {
  const passes = await db.select().from(guestPass).all();
  return { passes };
};
const actions = {
  create: async (event) => {
    const { request, locals } = event;
    const user = locals.user;
    if (!user || user.role !== "guard" && user.role !== "resident") {
      return fail(403, { error: "Only guards or residents can create guest passes." });
    }
    const form = await request.formData();
    const plateNumber = form.get("plateNumber")?.toString().trim();
    const visitTime = form.get("visitTime")?.toString();
    const durationMinutes = Number(form.get("durationMinutes"));
    if (!plateNumber || !visitTime || !durationMinutes) {
      return fail(400, { error: "All fields are required." });
    }
    await db.insert(guestPass).values({
      id: v4(),
      plateNumber,
      visitTime: new Date(visitTime),
      durationMinutes
    });
    return { success: true };
  },
  delete: async ({ request }) => {
    const form = await request.formData();
    const id = form.get("id")?.toString();
    if (!id) return fail(400, { error: "Missing pass ID." });
    await db.delete(guestPass).where(eq(guestPass.id, id));
    return { success: true };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BhfToOsI.js')).default;
const server_id = "src/routes/admin/dashboard/guests/+page.server.ts";
const imports = ["_app/immutable/nodes/10.D4Btbcd-.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/DLge_FqR.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/BSmjIgV1.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js"];
const stylesheets = ["_app/immutable/assets/10.YLoYO1Ix.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-Ux6oOm7Z.js.map
