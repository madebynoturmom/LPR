
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';
import { randomBytes } from 'crypto';
import { scryptSync } from 'crypto';
import { sendEmail } from '$lib/server/email';

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const name = form.get('name')?.toString().trim();
    const email = form.get('email')?.toString().trim();
    const phone = form.get('phone')?.toString().trim();
    const carNumber = form.get('carNumber')?.toString().trim();
    const houseAddress = form.get('houseAddress')?.toString().trim();

    if (!name || !email || !phone || !carNumber || !houseAddress) {
      return fail(400, { error: 'All fields are required.' });
    }

    // Generate a unique username and id for the resident
    const username = email;
    // Find max R### id
    const residents = await db.select().from(user).where(eq(user.role, 'resident'));
    const maxNum = residents
      .map(r => typeof r.id === 'string' && r.id.startsWith('R') ? parseInt(r.id.slice(1), 10) : 0)
      .reduce((max, n) => n > max ? n : max, 0);
    const nextNum = maxNum + 1;
    const id = `R${nextNum.toString().padStart(3, '0')}`;
    // Generate a random password
    const plainPassword = randomBytes(6).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 10);
    // Hash the password (using scrypt)
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(plainPassword, salt, 64).toString('hex');
    const passwordHash = `${salt}:${hash}`;

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
        houseAddress
      });
      // Send the plainPassword to the resident's email address
      // await sendEmail(email, 'Your Resident Account', `Welcome! Your password is: ${plainPassword}`);
      throw redirect(303, '/admin/dashboard/residents');
    } catch (e) {
      return fail(500, { error: 'Failed to create resident.' });
    }
  }
};
