import { d as db, b as guestPass, e as eq, k as guestPassHistory, f as and, j as desc } from './index3-Dp-zUSVy.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const actions = {
  revoke: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) return fail(401, { error: "Not authenticated." });
    const form = await request.formData();
    const id = form.get("id")?.toString();
    if (!id) return fail(400, { error: "Missing guest pass id" });
    const pass = await db.select().from(guestPass).where(eq(guestPass.id, id)).get();
    if (!pass || pass.userId !== user.id) return fail(403, { error: "Guest pass not found or not owned by you" });
    await db.insert(guestPassHistory).values({
      id: pass.id,
      plateNumber: pass.plateNumber,
      visitTime: pass.visitTime,
      durationMinutes: pass.durationMinutes,
      status: pass.status,
      userId: user.id,
      // User who revoked
      type: pass.type,
      revokedAt: /* @__PURE__ */ new Date()
    });
    await db.delete(guestPass).where(eq(guestPass.id, id));
    throw redirect(303, "/user/dashboard/guests");
  },
  extend: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) return fail(401, { error: "Not authenticated." });
    const form = await request.formData();
    const id = form.get("id")?.toString();
    const additionalMinutes = Number(form.get("duration"));
    if (!id || !additionalMinutes || isNaN(additionalMinutes)) return fail(400, { error: "Missing or invalid data" });
    const pass = await db.select().from(guestPass).where(eq(guestPass.id, id)).get();
    if (!pass || pass.userId !== user.id) return fail(403, { error: "Guest pass not found or not owned by you" });
    const newDuration = pass.durationMinutes + additionalMinutes;
    await db.update(guestPass).set({ durationMinutes: newDuration }).where(eq(guestPass.id, id));
    throw redirect(303, "/user/dashboard/guests");
  }
};
const load = async ({ locals }) => {
  const user = locals.user;
  if (!user) return { guestPasses: [] };
  const allGuestPasses = await db.select().from(guestPass).where(
    and(
      eq(guestPass.userId, user.id),
      eq(guestPass.type, "visitors"),
      eq(guestPass.status, "active")
    )
  ).orderBy(desc(guestPass.visitTime));
  const now = Math.floor(Date.now() / 1e3);
  const guestPasses = allGuestPasses.filter((pass) => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1e3);
    const expirationTime = visitTimeSeconds + pass.durationMinutes * 60;
    return now < expirationTime;
  });
  return { guestPasses };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 24;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DU4gp6_G.js')).default;
const server_id = "src/routes/user/dashboard/guests/+page.server.ts";
const imports = ["_app/immutable/nodes/24.DjO_-bgH.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/DQGvmDc0.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
const stylesheets = ["_app/immutable/assets/24.B1Tsbw86.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=24-CgCNKQ_8.js.map
