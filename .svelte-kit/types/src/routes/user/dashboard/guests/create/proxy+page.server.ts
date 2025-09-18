// @ts-nocheck
import { db } from '$lib/server/db';
import { guestPass as guestPassTable } from '$lib/server/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

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
        id: uuidv4(),
        plateNumber,
        visitTime: new Date(),
        durationMinutes
      });
      return { success: true };
    } catch (e) {
      return fail(500, { error: 'Failed to create guest pass.' });
    }
  }
};
;null as any as Actions;