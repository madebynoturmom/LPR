import { d as db, c as vehicle } from "../../../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
import { redirect, fail } from "@sveltejs/kit";
function getUserIdFromSession(cookies) {
  return "R001";
}
const load = async ({ params, cookies }) => {
  const userId = getUserIdFromSession();
  const { id } = params;
  const vehicles = await db.select().from(vehicle).where(eq(vehicle.id, id));
  if (!vehicles.length) throw redirect(303, "/user/dashboard/vehicles");
  const vehicle$1 = vehicles[0];
  if (vehicle$1.ownerId !== userId) throw redirect(303, "/user/dashboard/vehicles");
  return { vehicle: vehicle$1 };
};
const actions = {
  default: async ({ params, cookies }) => {
    const { id } = params;
    try {
      await db.delete(vehicle).where(eq(vehicle.id, id));
      return { success: true };
    } catch (e) {
      return fail(500, { error: "Failed to delete vehicle." });
    }
  }
};
export {
  actions,
  load
};
