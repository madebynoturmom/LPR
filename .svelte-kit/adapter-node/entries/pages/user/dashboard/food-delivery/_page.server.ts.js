import { d as db, g as guestPass, f as guestPassHistory } from "../../../../../chunks/index3.js";
import { fail, redirect } from "@sveltejs/kit";
import { eq, and, desc } from "drizzle-orm";
const actions = {
  revoke: async ({ request, locals }) => {
    const user2 = locals.user;
    if (!user2) return fail(401, { error: "Not authenticated." });
    const form = await request.formData();
    const id = form.get("id")?.toString();
    if (!id) return fail(400, { error: "Missing food delivery pass id" });
    const pass = await db.select().from(guestPass).where(eq(guestPass.id, id)).get();
    if (!pass || pass.userId !== user2.id) return fail(403, { error: "Food delivery pass not found or not owned by you" });
    await db.insert(guestPassHistory).values({
      id: pass.id,
      plateNumber: pass.plateNumber,
      visitTime: pass.visitTime,
      durationMinutes: pass.durationMinutes,
      status: pass.status,
      userId: user2.id,
      // User who revoked
      type: pass.type,
      revokedAt: /* @__PURE__ */ new Date(),
      name: pass.name,
      phone: pass.phone
    });
    await db.delete(guestPass).where(eq(guestPass.id, id));
    throw redirect(303, "/user/dashboard/food-delivery");
  },
  extend: async ({ request, locals }) => {
    const user2 = locals.user;
    if (!user2) return fail(401, { error: "Not authenticated." });
    const form = await request.formData();
    const id = form.get("id")?.toString();
    const additionalMinutes = Number(form.get("duration"));
    if (!id || !additionalMinutes || isNaN(additionalMinutes)) return fail(400, { error: "Missing or invalid data" });
    const pass = await db.select().from(guestPass).where(eq(guestPass.id, id)).get();
    if (!pass || pass.userId !== user2.id) return fail(403, { error: "Food delivery pass not found or not owned by you" });
    const newDuration = pass.durationMinutes + additionalMinutes;
    await db.update(guestPass).set({ durationMinutes: newDuration }).where(eq(guestPass.id, id));
    throw redirect(303, "/user/dashboard/food-delivery");
  }
};
const load = async ({ locals }) => {
  const user2 = locals.user;
  if (!user2) return { foodDeliveryPasses: [] };
  const allFoodDeliveryPasses = await db.select().from(guestPass).where(
    and(
      eq(guestPass.userId, user2.id),
      eq(guestPass.type, "food_delivery"),
      eq(guestPass.status, "active")
    )
  ).orderBy(desc(guestPass.visitTime));
  const now = Math.floor(Date.now() / 1e3);
  const foodDeliveryPasses = allFoodDeliveryPasses.filter((pass) => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1e3);
    const expirationTime = visitTimeSeconds + pass.durationMinutes * 60;
    return now < expirationTime;
  });
  return { foodDeliveryPasses };
};
export {
  actions,
  load
};
