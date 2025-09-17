
import { guestPass } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { v4 as uuidv4 } from 'uuid';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm/sql/expressions/conditions';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const passes = await db.select().from(guestPass).all();
	return { passes };
};

export const actions: Actions = {
   create: async (event) => {
	   const { request, locals } = event;
	   const user = locals.user;
	   if (!user || (user.role !== 'guard' && user.role !== 'resident')) {
		   return fail(403, { error: 'Only guards or residents can create guest passes.' });
	   }
	   const form = await request.formData();
	   const plateNumber = form.get('plateNumber')?.toString().trim();
	   const visitTime = form.get('visitTime')?.toString();
	   const durationMinutes = Number(form.get('durationMinutes'));

	   if (!plateNumber || !visitTime || !durationMinutes) {
		   return fail(400, { error: 'All fields are required.' });
	   }

	   await db.insert(guestPass).values({
		   id: uuidv4(),
		   plateNumber,
		   visitTime: new Date(visitTime),
		   durationMinutes
	   });
	   return { success: true };
   },
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id')?.toString();
		if (!id) return fail(400, { error: 'Missing pass ID.' });
		await db.delete(guestPass).where(eq(guestPass.id, id));
		return { success: true };
	}
};
