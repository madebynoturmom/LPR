// @ts-nocheck
import { db } from '$lib/server/db';
import { guestPass as guestPassTable } from '$lib/server/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

function getUserIdFromSession(cookies: any): string | null {
  return 'R001'; // Replace with real session logic
}

export const actions = {
  default: async ({ request, cookies }: import('./$types').RequestEvent) => {
    const userId = getUserIdFromSession(cookies);
    if (!userId) return fail(401, { error: 'Not authenticated.' });
    const form = await request.formData();
    const plateNumber = form.get('plateNumber')?.toString();
    const durationMinutes = Number(form.get('durationMinutes'));
    if (!plateNumber || !durationMinutes) {
      return fail(400, { error: 'All fields are required.' });
    }
    try {
      await db.insert(guestPassTable).values({
        id: userId, // Use userId as the id for the guest pass
        plateNumber,
        visitTime: new Date(),
        durationMinutes
      });
      return { success: true };
    } catch (e) {
      return fail(500, { error: 'Failed to issue pass.' });
    }
  }
};

export const load = async ({ cookies }: Parameters<PageServerLoad>[0]) => {
  const userId = getUserIdFromSession(cookies);
  if (!userId) return { foodDeliveryPasses: [] };

  const foodDeliveryPasses = await db.select().from(guestPassTable).where(eq(guestPassTable.type, 'food_delivery'));
  return { foodDeliveryPasses };
};
;null as any as Actions;