// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load = async () => {
  const residents = await db.select().from(user).where(eq(user.role, 'resident'));
  return { residents };
};

export const actions = {
  default: async ({ request }: import('./$types').RequestEvent) => {
    const form = await request.formData();
    const name = form.get('name')?.toString().trim();
    const email = form.get('email')?.toString().trim();
    const phone = form.get('phone')?.toString().trim();
    const carNumber = form.get('carNumber')?.toString().trim();
    const houseNumber = form.get('houseNumber')?.toString().trim();

    if (!name || !email || !phone || !carNumber || !houseNumber) {
      return fail(400, { error: 'All fields are required.' });
    }

    // Generate a unique username and id for the resident
    const username = email;
    const id = crypto.randomUUID();
    const passwordHash = '';

    try {
      await db.insert(user).values({
        id,
        username,
        passwordHash,
        role: 'resident',
        name,
        email,
        phone,
        carNumber,
        houseNumber
      });
      throw redirect(303, '/admin/dashboard/residents');
    } catch (e) {
      return fail(500, { error: 'Failed to create resident.' });
    }
  }
};
;null as any as PageServerLoad;;null as any as Actions;