import { db } from '$lib/server/db';
import { guestPassHistory, guestPass as guestPassTable } from '$lib/server/db/schema';
import { eq, sql, and, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  if (!user) return { pastPasses: [] };

  // Get revoked passes from history table
  const revokedPasses = await db.select().from(guestPassHistory).where(eq(guestPassHistory.userId, user.id));

  // Get expired passes (active but past their expiration time)
  const allActivePasses = await db.select().from(guestPassTable).where(
    and(
      eq(guestPassTable.userId, user.id),
      eq(guestPassTable.status, 'active')
    )
  );
  
  const now = Math.floor(Date.now() / 1000);
  const expiredPasses = allActivePasses.filter(pass => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1000);
    const expirationTime = visitTimeSeconds + (pass.durationMinutes * 60);
    return now >= expirationTime;
  }).map(pass => ({ ...pass, reason: 'expired' as const }));

  // Combine and sort by most recent first
  const pastPasses = [
    ...revokedPasses.map(pass => ({ ...pass, reason: 'revoked' as const })),
    ...expiredPasses
  ].sort((a, b) => new Date(b.visitTime).getTime() - new Date(a.visitTime).getTime());

  return { pastPasses };
};