import { d as db, c as vehicle } from "../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
function getUserIdFromSession(cookies) {
  return "R001";
}
const load = async ({ cookies }) => {
  const userId = getUserIdFromSession();
  const vehicles = await db.select().from(vehicle).where(eq(vehicle.ownerId, userId));
  return { vehicles };
};
export {
  load
};
