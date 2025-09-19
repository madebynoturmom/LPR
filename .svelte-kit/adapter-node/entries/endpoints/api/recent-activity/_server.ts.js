import { json } from "@sveltejs/kit";
import { d as db, e as eventLog } from "../../../../chunks/index3.js";
import { desc } from "drizzle-orm";
async function GET() {
  const recentEvents = await db.select().from(eventLog).orderBy(desc(eventLog.timestamp)).limit(10);
  const activeGuestPasses = recentEvents.filter((event) => event.type === "guest_pass" && event.details?.includes("active")).length;
  const activeFoodDeliveryPasses = recentEvents.filter((event) => event.type === "food_delivery" && event.details?.includes("active")).length;
  const recentCarAccess = recentEvents.find((event) => event.type === "vehicle_access")?.details || "N/A";
  return json({
    activeGuestPasses,
    activeFoodDeliveryPasses,
    recentCarAccess
  });
}
export {
  GET
};
