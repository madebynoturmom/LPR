// @ts-nocheck
import { guestPass } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { v4 as uuidv4 } from 'uuid';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm/sql/expressions/conditions';
import type { Actions, PageServerLoad } from './$types';

export const load = async () => {
	const passes = await db.select().from(guestPass).all();
	return { passes };
};

export const actions = {
   create: async (event: import('./$types').RequestEvent) => {
	   const { request, locals } = event;
	   const user = locals.user;
	   if (!user || (user.role !== 'guard' && user.role !== 'resident' && user.role !== 'admin')) {
		   return fail(403, { error: 'Only guards, residents, or admins can create guest passes.' });
	   }

	   console.log('User Role:', user.role); // Debugging log to verify user role
	   const form = await request.formData();
	   const plateNumber = form.get('plateNumber')?.toString().trim();
	   const name = form.get('name')?.toString().trim();
	   const phone = form.get('phone')?.toString().trim();
	   const visitTime = form.get('visitTime')?.toString();
	   const durationMinutes = Number(form.get('durationMinutes'));

	   if (!plateNumber || !name || !phone || !visitTime || !durationMinutes) {
		   return fail(400, { error: 'All fields are required.' });
	   }

	   const id = uuidv4();
	   await db.insert(guestPass).values({
		   id,
		   plateNumber,
		   visitTime: new Date(visitTime),
		   durationMinutes,
		   status: 'active',
		   userId: user.id,
		   type: 'visitors',
		   name,
		   phone
	   });

	   // Schedule expiration logic
	   setTimeout(async () => {
		   const client = db.$client;

		   client.prepare(
			   `UPDATE guest_pass SET status = 'expired' WHERE id = ? AND status != 'revoked'`
		   ).run(id);

		   client.prepare(
			   `INSERT INTO guest_pass_history (id, plate_number, visit_time, duration_minutes, status, user_id, type, revoked_at, name, phone)
				SELECT id, plate_number, visit_time, duration_minutes, 'expired', user_id, type, strftime('%s', 'now'), name, phone
				FROM guest_pass
				WHERE id = ? AND status = 'expired'`
		   ).run(id);

		   client.prepare(
			   `DELETE FROM guest_pass WHERE id = ? AND status = 'expired'`
		   ).run(id);

		   console.log('Guest pass expired:', id);
	   }, durationMinutes * 60 * 1000);

	   return { success: true };
   },
	delete: async ({ request }: import('./$types').RequestEvent) => {
		const form = await request.formData();
		const id = form.get('id')?.toString();
		if (!id) return fail(400, { error: 'Missing pass ID.' });
		await db.delete(guestPass).where(eq(guestPass.id, id));
		return { success: true };
	}
};
;null as any as PageServerLoad;;null as any as Actions;