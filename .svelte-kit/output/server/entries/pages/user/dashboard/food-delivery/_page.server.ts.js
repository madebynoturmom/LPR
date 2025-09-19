import { d as db, g as guestPass } from "../../../../../chunks/index3.js";
import { fail } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
function getUserIdFromSession(cookies) {
  return "R001";
}
const actions = {
  default: async ({ request, cookies }) => {
    const userId = getUserIdFromSession();
    const form = await request.formData();
    const plateNumber = form.get("plateNumber")?.toString();
    const durationMinutes = Number(form.get("durationMinutes"));
    if (!plateNumber || !durationMinutes) {
      return fail(400, { error: "All fields are required." });
    }
    try {
      await db.insert(guestPass).values({
        id: userId,
        // Use userId as the id for the guest pass
        plateNumber,
        visitTime: /* @__PURE__ */ new Date(),
        durationMinutes
      });
      return { success: true };
    } catch (e) {
      return fail(500, { error: "Failed to issue pass." });
    }
  }
};
const load = async ({ cookies }) => {
  const foodDeliveryPasses = await db.select().from(guestPass).where(eq(guestPass.type, "food_delivery"));
  return { foodDeliveryPasses };
};
export {
  actions,
  load
};
