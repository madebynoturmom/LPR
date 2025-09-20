import { d as db, c as vehicle } from "../../../../../../chunks/index3.js";
import { fail, redirect } from "@sveltejs/kit";
import { v4 } from "uuid";
import { eq } from "drizzle-orm";
const actions = {
  default: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) return fail(401, { error: "Not authenticated." });
    const form = await request.formData();
    const model = form.get("model")?.toString();
    const makeYear = Number(form.get("makeYear"));
    const plateNumber = form.get("plateNumber")?.toString();
    if (!model || !makeYear || !plateNumber) {
      return fail(400, { error: "All fields are required." });
    }
    const existingVehicle = await db.select().from(vehicle).where(eq(vehicle.plateNumber, plateNumber)).get();
    if (existingVehicle) {
      return fail(400, { error: "A vehicle with this plate number already exists." });
    }
    try {
      await db.insert(vehicle).values({
        id: v4(),
        model,
        makeYear,
        plateNumber,
        ownerId: user.id
      });
    } catch (e) {
      return fail(500, { error: "Failed to add vehicle." });
    }
    throw redirect(303, "/user/dashboard/vehicles");
  }
};
export {
  actions
};
