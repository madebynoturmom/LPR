// @ts-nocheck
import { db } from '$lib/server/db';
import { vehicle as vehicleTable } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import type { Actions } from './$types';

function getUserIdFromSession(cookies: any): string | null {
  return 'R001'; // Replace with real session logic
}

export const actions = {
  default: async ({ request, cookies }: import('./$types').RequestEvent) => {
    const userId = getUserIdFromSession(cookies);
    if (!userId) return fail(401, { error: 'Not authenticated.' });
    const form = await request.formData();
    const model = form.get('model')?.toString();
    const makeYear = Number(form.get('makeYear'));
    const plateNumber = form.get('plateNumber')?.toString();
    if (!model || !makeYear || !plateNumber) {
      return fail(400, { error: 'All fields are required.' });
    }
    try {
      await db.insert(vehicleTable).values({
        id: uuidv4(),
        model,
        makeYear,
        plateNumber,
        ownerId: userId
      });
      return { success: true };
    } catch (e) {
      return fail(500, { error: 'Failed to add vehicle.' });
    }
  }
};
;null as any as Actions;