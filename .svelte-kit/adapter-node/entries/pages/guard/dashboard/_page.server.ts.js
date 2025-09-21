import { d as db, g as guestPass, f as guestPassHistory, e as eventLog } from "../../../../chunks/index3.js";
import { fail } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
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
export {
  actions,
  load
};
