import { j as json } from './index-BmA2ZghE.js';
import { d as db, c as eventLog, j as desc } from './index3-DTrFeyBm.js';
import 'dotenv/config';
import 'better-sqlite3';

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

export { GET };
//# sourceMappingURL=_server.ts-BIym3Mjq.js.map
