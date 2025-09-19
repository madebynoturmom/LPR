import { d as db, b as guestPass, e as eq, i as guestPassHistory } from './index3-DE5iFVeB.js';
import { r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const actions = {
  revoke: async ({ request }) => {
    const form = await request.formData();
    const id = form.get("id")?.toString();
    if (!id) return { error: "Missing guest pass id" };
    const [pass] = await db.select().from(guestPass).where(eq(guestPass.id, id));
    if (!pass) return { error: "Guest pass not found" };
    await db.insert(guestPassHistory).values({
      id: pass.id,
      plateNumber: pass.plateNumber,
      visitTime: pass.visitTime,
      durationMinutes: pass.durationMinutes,
      revokedAt: /* @__PURE__ */ new Date()
    });
    await db.delete(guestPass).where(eq(guestPass.id, id));
    throw redirect(303, "/user/dashboard/guests");
  },
  extend: async ({ request }) => {
    const form = await request.formData();
    const id = form.get("id")?.toString();
    const newDuration = Number(form.get("duration"));
    if (!id || !newDuration || isNaN(newDuration)) return { error: "Missing or invalid data" };
    await db.update(guestPass).set({ durationMinutes: newDuration }).where(eq(guestPass.id, id));
    throw redirect(303, "/user/dashboard/guests");
  }
};
function getUserIdFromSession(cookies) {
  return "R001";
}
const load = async ({ cookies }) => {
  const userId = getUserIdFromSession();
  const guestPasses = await db.select().from(guestPass).where(eq(guestPass.id, userId));
  return { guestPasses };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 23;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DwV3uUYH.js')).default;
const server_id = "src/routes/user/dashboard/guests/+page.server.ts";
const imports = ["_app/immutable/nodes/23.CDoaB4YU.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/DLge_FqR.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/BSmjIgV1.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js"];
const stylesheets = ["_app/immutable/assets/23.B1Tsbw86.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=23-DHXHgf5w.js.map
