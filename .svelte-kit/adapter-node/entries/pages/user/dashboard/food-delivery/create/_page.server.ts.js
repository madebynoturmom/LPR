import { d as db, u as user, v as vehicle, g as guestPass } from "../../../../../../chunks/index3.js";
import { v4 } from "uuid";
import { fail, redirect } from "@sveltejs/kit";
import { eq, and } from "drizzle-orm";
const actions = {
  default: async ({ request, locals }) => {
    const userSession = locals.user;
    if (!userSession) return fail(401, { error: "Not authenticated." });
    const fullUser = await db.select().from(user).where(eq(user.id, userSession.id)).get();
    if (!fullUser) return fail(401, { error: "User not found." });
    const form = await request.formData();
    const plateNumber = form.get("plateNumber")?.toString().trim();
    const name = form.get("name")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const durationMinutes = Number(form.get("durationMinutes"));
    if (!plateNumber || !name || !phone || !durationMinutes) {
      return fail(400, { error: "All fields are required." });
    }
    const existingVehicle = await db.select().from(vehicle).where(and(eq(vehicle.plateNumber, plateNumber), eq(vehicle.ownerId, userSession.id))).limit(1);
    if (existingVehicle.length > 0) {
      return fail(400, { error: "This plate number belongs to one of your registered vehicles. Please enter a different plate number for the food delivery pass." });
    }
    const id = v4();
    try {
      await db.insert(guestPass).values({
        id,
        plateNumber,
        visitTime: /* @__PURE__ */ new Date(),
        durationMinutes,
        status: "active",
        userId: userSession.id,
        type: "food_delivery",
        name,
        phone
      });
    } catch (e) {
      return fail(500, { error: "Failed to issue pass." });
    }
    throw redirect(303, "/user/dashboard/food-delivery");
  }
};
export {
  actions
};
