
import { db } from '$lib/server/db';
import { guestPass as guestPassTable, guestPassHistory } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
export const actions: Actions = {
  revoke: async ({ request }) => {
    const form = await request.formData();
    const id = form.get('id')?.toString();
    if (!id) return { error: 'Missing guest pass id' };
    // Find the guest pass
    const [pass] = await db.select().from(guestPassTable).where(eq(guestPassTable.id, id));
    if (!pass) return { error: 'Guest pass not found' };
    // Move to history
    await db.insert(guestPassHistory).values({
      id: pass.id,
      plateNumber: pass.plateNumber,
      visitTime: pass.visitTime,
      durationMinutes: pass.durationMinutes,
      revokedAt: new Date()
    });
    // Delete from active
    await db.delete(guestPassTable).where(eq(guestPassTable.id, id));
    // Redirect to refresh
    throw redirect(303, '/user/dashboard/guests');
  },
  extend: async ({ request }) => {
    const form = await request.formData();
    const id = form.get('id')?.toString();
    const newDuration = Number(form.get('duration'));
    if (!id || !newDuration || isNaN(newDuration)) return { error: 'Missing or invalid data' };
    await db.update(guestPassTable)
      .set({ durationMinutes: newDuration })
      .where(eq(guestPassTable.id, id));
    throw redirect(303, '/user/dashboard/guests');
  }
};

function getUserIdFromSession(cookies: any): string | null {
  return 'R001'; // Replace with real session logic
}

export const load: PageServerLoad = async ({ cookies }) => {
  const userId = getUserIdFromSession(cookies);
  if (!userId) return { guestPasses: [] };
  const guestPasses = await db.select().from(guestPassTable).where(eq(guestPassTable.id, userId));
  return { guestPasses };
};
