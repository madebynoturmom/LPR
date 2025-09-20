import { db } from '$lib/server/db';
import { user, admin, session as sessionTable } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import type { Actions } from './$types';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';

export const actions: Actions = {
  default: async (event) => {
    const { request, cookies } = event;
    const form = await request.formData();
    const username = form.get('username')?.toString().trim();
    const password = form.get('password')?.toString();
    if (!username || !password) {
      console.error('Login failed: Missing username or password'); // Debugging log
      return fail(400, { error: 'Username and password are required.' });
    }

    let found: any = null;
    let userRole: string | null = null;
    const admins = await db.select().from(admin).where(eq(admin.username, username));
    if (admins.length > 0) {
      found = admins[0];
      userRole = 'admin';
    } else {
      const users = await db.select().from(user).where(eq(user.username, username));
      if (users.length > 0) {
        found = users[0];
        userRole = found.role;
      }
    }
    if (!found) {
      console.error('Login failed: Invalid username'); // Debugging log
      return fail(401, { error: 'Invalid username or password.' });
    }

    const hash = encodeHexLowerCase(sha256(new TextEncoder().encode(password)));
    if (hash !== found.passwordHash) {
      console.error('Login failed: Invalid password'); // Debugging log
      return fail(401, { error: 'Invalid username or password.' });
    }

    const sessionToken = auth.generateSessionToken();
    const session = await auth.createSession(sessionToken, found.id);
    auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

    if (userRole === 'admin') {
      throw redirect(303, '/admin/dashboard');
    } else if (userRole === 'guard') {
      throw redirect(303, '/guard/dashboard');
    } else if (userRole === 'resident') {
      throw redirect(303, '/user/dashboard');
    } else {
      throw redirect(303, '/');
    }
  }
};

// Lucia login logic will be implemented here

export const load = async () => {
  return {};
};
