// @ts-nocheck

import { db } from '$lib/server/db';
import { guard } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load = async () => {
  const guards = await db.select().from(guard);
  return { guards };
};

export const actions = {
  default: async ({ request }: import('./$types').RequestEvent) => {
    const form = await request.formData();
    const name = form.get('name')?.toString().trim();
    const phone = form.get('phone')?.toString().trim();
    const guardId = form.get('guardId')?.toString().trim();
    if (!name || !phone || !guardId) {
      return fail(400, { error: 'All fields are required.' });
    }
    // Use guardId as username for uniqueness
    try {
      await db.insert(guard).values({
        username: guardId,
        name,
        phone,
        guardId
      });
      throw redirect(303, '/admin/dashboard/guards');
    } catch (e) {
      return fail(500, { error: 'Failed to create guard.' });
    }
  }
};
;null as any as PageServerLoad;;null as any as Actions;