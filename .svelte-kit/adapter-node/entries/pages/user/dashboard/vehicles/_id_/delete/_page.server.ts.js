import { d as db, c as vehicle } from "../../../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
import { redirect, fail } from "@sveltejs/kit";
const load = async ({ params, locals }) => {
  const user = locals.user;
  if (!user) throw redirect(303, "/login");
  const { id } = params;
  const vehicles = await db.select().from(vehicle).where(eq(vehicle.id, id));
  if (!vehicles.length) throw redirect(303, "/user/dashboard/vehicles");
  const vehicle$1 = vehicles[0];
  if (vehicle$1.ownerId !== user.id) throw redirect(303, "/user/dashboard/vehicles");
  return { vehicle: vehicle$1 };
};
const actions = {
  default: async ({ params, locals }) => {
    console.log("Delete action triggered");
    const user = locals.user;
    console.log("User from locals:", user);
    if (!user) {
      console.error("Authentication failed: No user");
      return fail(401, { error: "Not authenticated." });
    }
    const { id } = params;
    console.log("Vehicle ID to delete:", id);
    try {
      await db.delete(vehicle).where(eq(vehicle.id, id));
      console.log("Vehicle deleted successfully:", id);
      return { success: true };
    } catch (e) {
      console.error("Error deleting vehicle:", e);
      return fail(500, { error: "Failed to delete vehicle." });
    }
  }
};
export {
  actions,
  load
};
