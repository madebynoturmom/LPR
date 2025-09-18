// @ts-nocheck
import { db } from '$lib/server/db';
import { guard } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { eq } from 'drizzle-orm';

export const actions = {
  default: async ({ request }: import('./$types').RequestEvent) => {
    const form = await request.formData();
    const name = form.get('name')?.toString().trim();
    const phone = form.get('phone')?.toString().trim();
    // Generate next G### id
    const guards = await db.select().from(guard);
    const maxNum = guards
      .map(g => typeof g.guardId === 'string' && g.guardId.startsWith('G') ? parseInt(g.guardId.slice(1), 10) : 0)
      .reduce((max, n) => n > max ? n : max, 0);
    const nextNum = maxNum + 1;
    const guardId = `G${nextNum.toString().padStart(3, '0')}`;
    const file = form.get('profilePic');
    let profilePic: string | null = null;
    if (file && typeof file === 'object' && 'arrayBuffer' in file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      profilePic = `data:${file.type};base64,${buffer.toString('base64')}`;
    }
    if (!name || !phone || !guardId) {
      return fail(400, { error: 'All fields are required.' });
    }
    try {
      await db.insert(guard).values({
        username: guardId,
        name,
        phone,
        guardId,
        profilePic
      });
      throw redirect(303, '/admin/dashboard/guards');
    } catch (e) {
      return fail(500, { error: 'Failed to create guard.' });
    }
  }
};
;null as any as Actions;