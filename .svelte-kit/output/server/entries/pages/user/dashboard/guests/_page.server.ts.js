import { d as db, g as guestPass, f as guestPassHistory } from "../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";
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
export {
  actions,
  load
};
