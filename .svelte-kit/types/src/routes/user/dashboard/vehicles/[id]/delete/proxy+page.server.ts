// @ts-nocheck
import { db } from '$lib/server/db';
import { vehicle as vehicleTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

function getUserIdFromSession(cookies: any): string | null {
  return 'R001'; // Replace with real session logic
}

export const load = async ({ params, cookies }: Parameters<PageServerLoad>[0]) => {
  const userId = getUserIdFromSession(cookies);
  if (!userId) throw redirect(303, '/login');
  const { id } = params;
  const vehicles = await db.select().from(vehicleTable).where(eq(vehicleTable.id, id));
  if (!vehicles.length) throw redirect(303, '/user/dashboard/vehicles');
  const vehicle = vehicles[0];
  if (vehicle.ownerId !== userId) throw redirect(303, '/user/dashboard/vehicles');
  return { vehicle };
};

export const actions = {
  default: async ({ params, cookies }: import('./$types').RequestEvent) => {
    const userId = getUserIdFromSession(cookies);
    if (!userId) return fail(401, { error: 'Not authenticated.' });
    const { id } = params;
    try {
      await db.delete(vehicleTable).where(eq(vehicleTable.id, id));
      return { success: true };
    } catch (e) {
      return fail(500, { error: 'Failed to delete vehicle.' });
    }
  }
};
;null as any as Actions;