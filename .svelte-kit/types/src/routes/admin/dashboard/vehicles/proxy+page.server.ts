// @ts-nocheck

import { db } from '$lib/server/db';
import { vehicle, user } from '$lib/server/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm/sql/expressions/conditions';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = async () => {
  // Join vehicles with user to get owner name
  const vehiclesRaw = await db.select().from(vehicle).all();
  const users = await db.select().from(user).all();
  const userMap = Object.fromEntries(users.map(u => [u.id, u]));
  const vehicles = vehiclesRaw.map(v => ({
    ...v,
    ownerName: userMap[v.ownerId]?.name || userMap[v.ownerId]?.username || '-'
  }));
  return { vehicles, users };
};

export const actions = {
  delete: async ({ request }: import('./$types').RequestEvent) => {
    const form = await request.formData();
    const id = form.get('id')?.toString();
    if (!id) return fail(400, { error: 'Missing vehicle ID.' });
    await db.delete(vehicle).where(eq(vehicle.id, id));
    return { success: true };
  }
};
;null as any as PageServerLoad;;null as any as Actions;