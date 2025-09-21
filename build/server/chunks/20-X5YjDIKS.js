import { d as db, b as guestPass, e as eq, j as guestPassHistory, c as eventLog } from './index3-DfwD5jMB.js';
import { f as fail } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

function requireGuard(locals) {
  if (!locals.user) return { ok: false, status: 401, message: "Not authenticated." };
  if (locals.user.role !== "guard") return { ok: false, status: 403, message: "Forbidden: guard role required." };
  return { ok: true, user: locals.user };
}
const load = async ({ locals }) => {
  const check = requireGuard(locals);
  if (!check.ok) return { activeVisitorPasses: [], activeFoodDeliveryPasses: [], recentCarAccess: [] };
  const now = Math.floor(Date.now() / 1e3);
  const allVisitors = await db.select().from(guestPass).where(eq(guestPass.type, "visitors"));
  const activeVisitorPasses = allVisitors.filter((pass) => {
    const visitTimeSeconds = Math.floor(new Date(pass.visitTime).getTime() / 1e3);
    const expirationTime = visitTimeSeconds + pass.durationMinutes * 60;
    return pass.status === "active" && now < expirationTime;
  }).map((p) => ({ ...p, visitTime: new Date(p.visitTime).toISOString() }));
  const allFood = await db.select().from(guestPass).where(eq(guestPass.type, "food_delivery"));
  const activeFoodDeliveryPasses = allFood.filter((pass) => {
    const visitTimeSeconds = Math.floor(new Date(pass.visitTime).getTime() / 1e3);
    const expirationTime = visitTimeSeconds + pass.durationMinutes * 60;
    return pass.status === "active" && now < expirationTime;
  }).map((p) => ({ ...p, visitTime: new Date(p.visitTime).toISOString() }));
  const recentRows = await db.all(`SELECT id, type, details, timestamp FROM event_log ORDER BY timestamp DESC LIMIT 10;`);
  const recentCarAccess = Array.isArray(recentRows) ? recentRows : [];
  return { activeVisitorPasses, activeFoodDeliveryPasses, recentCarAccess };
};
const actions = {
  admit: async ({ request, locals }) => {
    const check = requireGuard(locals);
    if (!check.ok) return fail(check.status ?? 403, { error: check.message });
    const form = await request.formData();
    const id = form.get("id")?.toString();
    if (!id) return fail(400, { error: "Missing pass id" });
    const pass = await db.select().from(guestPass).where(eq(guestPass.id, id)).get();
    if (!pass) return fail(404, { error: "Pass not found" });
    const now = Math.floor(Date.now() / 1e3);
    const visitTimeSeconds = Math.floor(new Date(pass.visitTime).getTime() / 1e3);
    const expirationTime = visitTimeSeconds + pass.durationMinutes * 60;
    if (pass.status !== "active" || now >= expirationTime) return fail(400, { error: "Pass is not active or has expired" });
    try {
      const guardUser = check.user;
      await db.insert(eventLog).values({ id: `E${Date.now()}`, type: "vehicle_entry", userId: guardUser.id, details: `Admitted pass ${pass.id} (${pass.plateNumber}) by guard ${guardUser.username}`, timestamp: /* @__PURE__ */ new Date() });
      return { success: true };
    } catch (e) {
      return fail(500, { error: "Failed to admit pass." });
    }
  },
  deny: async ({ request, locals }) => {
    const check = requireGuard(locals);
    if (!check.ok) return fail(check.status ?? 403, { error: check.message });
    const form = await request.formData();
    const id = form.get("id")?.toString();
    if (!id) return fail(400, { error: "Missing pass id" });
    const pass = await db.select().from(guestPass).where(eq(guestPass.id, id)).get();
    if (!pass) return fail(404, { error: "Pass not found" });
    if (pass.status !== "active") return fail(400, { error: "Pass is not active" });
    try {
      await db.insert(guestPassHistory).values({ id: pass.id, plateNumber: pass.plateNumber, visitTime: new Date(pass.visitTime), durationMinutes: pass.durationMinutes, status: "revoked", userId: pass.userId, type: pass.type, revokedAt: /* @__PURE__ */ new Date(), name: pass.name, phone: pass.phone });
      await db.delete(guestPass).where(eq(guestPass.id, id));
      const guardUser = check.user;
      await db.insert(eventLog).values({ id: `E${Date.now()}`, type: "access_denied", userId: guardUser.id, details: `Denied pass ${pass.id} (${pass.plateNumber}) by guard ${guardUser.username}`, timestamp: /* @__PURE__ */ new Date() });
      return { success: true };
    } catch (e) {
      return fail(500, { error: "Failed to deny pass." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 20;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-T6_mmFUj.js')).default;
const server_id = "src/routes/guard/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/20.B42nURwR.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/BdvQLAZU.js","_app/immutable/chunks/g0qwyJPX.js","_app/immutable/chunks/BfIrQ_zr.js","_app/immutable/chunks/Cko499XQ.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/BWorSmfV.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js"];
const stylesheets = ["_app/immutable/assets/20.Dxm5GUdE.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=20-X5YjDIKS.js.map
