// @ts-nocheck
import { db } from '$lib/server/db';
import { guestPass as guestPassTable } from '$lib/server/db/schema';
import { eq, and, sql, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  const user = locals.user;
  if (!user) {
    return {
      recentActivity: {
        activeGuestPasses: 0,
        activeFoodDeliveryPasses: 0,
        recentCarAccess: 'N/A'
      },
      activeGuestPasses: [],
      activeFoodDeliveryPasses: []
    };
  }

  // Get active guest passes (visitors)
  const activeGuestPassesRows = await db.all(
    sql`SELECT COUNT(*) as count FROM guest_pass WHERE user_id = ${user.id} AND status = 'active' AND type = 'visitors'`
  ) as { count: number }[];
  const activeGuestPassesCount = activeGuestPassesRows[0]?.count ? Number(activeGuestPassesRows[0].count) : 0;

  // Get the actual active guest passes - use Drizzle select for proper type conversion
  const allActiveGuestPasses = await db.select().from(guestPassTable).where(
    and(
      eq(guestPassTable.userId, user.id),
      eq(guestPassTable.status, 'active'),
      eq(guestPassTable.type, 'visitors')
    )
  ).orderBy(desc(guestPassTable.visitTime));
  
  // Filter for active passes (not expired)
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const activeGuestPasses = allActiveGuestPasses.filter(pass => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1000);
    const expirationTime = visitTimeSeconds + (pass.durationMinutes * 60);
    return now < expirationTime;
  });

  // Get active food delivery passes
  const activeFoodDeliveryPassesRows = await db.all(
    sql`SELECT COUNT(*) as count FROM guest_pass WHERE user_id = ${user.id} AND status = 'active' AND type = 'food_delivery'`
  ) as { count: number }[];
  const activeFoodDeliveryPassesCount = activeFoodDeliveryPassesRows[0]?.count ? Number(activeFoodDeliveryPassesRows[0].count) : 0;

  // Get the actual active food delivery passes - use Drizzle select for proper type conversion
  const allActiveFoodDeliveryPasses = await db.select().from(guestPassTable).where(
    and(
      eq(guestPassTable.userId, user.id),
      eq(guestPassTable.status, 'active'),
      eq(guestPassTable.type, 'food_delivery')
    )
  ).orderBy(desc(guestPassTable.visitTime));
  
  // Filter for active passes (not expired)
  const activeFoodDeliveryPasses = allActiveFoodDeliveryPasses.filter(pass => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1000);
    const expirationTime = visitTimeSeconds + (pass.durationMinutes * 60);
    return now < expirationTime;
  });

  // For recent car access, we could check vehicle access events, but for now keep as N/A
  const recentCarAccess = 'N/A';

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