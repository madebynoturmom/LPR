import { d as db, g as guestPass } from "../../../../chunks/index3.js";
import { sql, and, eq, desc } from "drizzle-orm";
const load = async ({ locals }) => {
  const user = locals.user;
  if (!user) {
    return {
      recentActivity: {
        activeGuestPasses: 0,
        activeFoodDeliveryPasses: 0,
        recentCarAccess: "N/A"
      },
      activeGuestPasses: [],
      activeFoodDeliveryPasses: []
    };
  }
  const activeGuestPassesRows = await db.all(
    sql`SELECT COUNT(*) as count FROM guest_pass WHERE user_id = ${user.id} AND status = 'active' AND type = 'visitors'`
  );
  const activeGuestPassesCount = activeGuestPassesRows[0]?.count ? Number(activeGuestPassesRows[0].count) : 0;
  const allActiveGuestPasses = await db.select().from(guestPass).where(
    and(
      eq(guestPass.userId, user.id),
      eq(guestPass.status, "active"),
      eq(guestPass.type, "visitors")
    )
  ).orderBy(desc(guestPass.visitTime));
  const now = Math.floor(Date.now() / 1e3);
  const activeGuestPasses = allActiveGuestPasses.filter((pass) => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1e3);
    const expirationTime = visitTimeSeconds + pass.durationMinutes * 60;
    return now < expirationTime;
  });
  const activeFoodDeliveryPassesRows = await db.all(
    sql`SELECT COUNT(*) as count FROM guest_pass WHERE user_id = ${user.id} AND status = 'active' AND type = 'food_delivery'`
  );
  const activeFoodDeliveryPassesCount = activeFoodDeliveryPassesRows[0]?.count ? Number(activeFoodDeliveryPassesRows[0].count) : 0;
  const allActiveFoodDeliveryPasses = await db.select().from(guestPass).where(
    and(
      eq(guestPass.userId, user.id),
      eq(guestPass.status, "active"),
      eq(guestPass.type, "food_delivery")
    )
  ).orderBy(desc(guestPass.visitTime));
  const activeFoodDeliveryPasses = allActiveFoodDeliveryPasses.filter((pass) => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1e3);
    const expirationTime = visitTimeSeconds + pass.durationMinutes * 60;
    return now < expirationTime;
  });
  const recentCarAccess = "N/A";
  return {
    recentActivity: {
      activeGuestPasses: activeGuestPassesCount,
      activeFoodDeliveryPasses: activeFoodDeliveryPassesCount,
      recentCarAccess
    },
    activeGuestPasses,
    activeFoodDeliveryPasses
  };
};
export {
  load
};
