// @ts-nocheck

import { db } from '$lib/server/db';
import { guestPass as guestPassTable, guestPassHistory } from '$lib/server/db/schema';
import { eq, and, sql, desc } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const actions = {
  revoke: async ({ request, locals }: import('./$types').RequestEvent) => {
    const user = locals.user;
    if (!user) return fail(401, { error: 'Not authenticated.' });
    const form = await request.formData();
    const id = form.get('id')?.toString();
    if (!id) return fail(400, { error: 'Missing guest pass id' });
    // Find the guest pass
    const pass = await db.select().from(guestPassTable).where(eq(guestPassTable.id, id)).get();
    if (!pass || pass.userId !== user.id) return fail(403, { error: 'Guest pass not found or not owned by you' });
    // Move to history
    await db.insert(guestPassHistory).values({
      id: pass.id,
      plateNumber: pass.plateNumber,
      visitTime: pass.visitTime,
      durationMinutes: pass.durationMinutes,
      status: pass.status,
      userId: user.id, // User who revoked
      type: pass.type,
      revokedAt: new Date()
    });
    // Delete from active
    await db.delete(guestPassTable).where(eq(guestPassTable.id, id));
    // Redirect to refresh
    throw redirect(303, '/user/dashboard/guests');
  },
  extend: async ({ request, locals }: import('./$types').RequestEvent) => {
    const user = locals.user;
    if (!user) return fail(401, { error: 'Not authenticated.' });
    const form = await request.formData();
    const id = form.get('id')?.toString();
    const additionalMinutes = Number(form.get('duration'));
    if (!id || !additionalMinutes || isNaN(additionalMinutes)) return fail(400, { error: 'Missing or invalid data' });
    // Check ownership
    const pass = await db.select().from(guestPassTable).where(eq(guestPassTable.id, id)).get();
    if (!pass || pass.userId !== user.id) return fail(403, { error: 'Guest pass not found or not owned by you' });
    // Add the additional time to the existing duration
    const newDuration = pass.durationMinutes + additionalMinutes;
    await db.update(guestPassTable)
      .set({ durationMinutes: newDuration })
      .where(eq(guestPassTable.id, id));
    throw redirect(303, '/user/dashboard/guests');
  }
};

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  const user = locals.user;
  if (!user) return { guestPasses: [] };
  
  // Get all active visitor passes, then filter for non-expired ones
  const allGuestPasses = await db.select().from(guestPassTable).where(
    and(
      eq(guestPassTable.userId, user.id),
      eq(guestPassTable.type, 'visitors'),
      eq(guestPassTable.status, 'active')
    )
  ).orderBy(desc(guestPassTable.visitTime));
  
  // Filter for active passes (not expired)
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const guestPasses = allGuestPasses.filter(pass => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1000);
    const expirationTime = visitTimeSeconds + (pass.durationMinutes * 60);
    return now < expirationTime;
  });
  
  return { guestPasses };
};
;null as any as Actions;