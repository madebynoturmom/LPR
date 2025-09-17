import { db } from '$lib/server/db';
import { vehicle, user } from '$lib/server/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const allUsers = await db.select().from(user).all();
  const users = allUsers.filter(u => u.role === 'resident');
  return { users };
// removed stray brace
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const plateNumber = form.get('plateNumber')?.toString().trim();
    const ownerId = form.get('ownerId')?.toString();
    const model = form.get('model')?.toString();
    const makeYear = Number(form.get('makeYear'));
    if (!plateNumber || !ownerId || !model || !makeYear) {
      return fail(400, { error: 'All fields are required.' });
    }
    await db.insert(vehicle).values({
      id: uuidv4(),
      plateNumber,
      ownerId,
      model,
      makeYear
    });
    throw redirect(303, '/admin/dashboard/vehicles');
  }
};
