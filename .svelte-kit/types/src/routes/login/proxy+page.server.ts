// @ts-nocheck
import { db } from '$lib/server/db';
import { user, admin, session as sessionTable } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import type { Actions } from './$types';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export const actions = {
  default: async ({ request, cookies }: import('./$types').RequestEvent) => {
    const form = await request.formData();
    const username = form.get('username')?.toString().trim();
    const password = form.get('password')?.toString();
    if (!username || !password) {
      return fail(400, { error: 'Username and password are required.' });
    }
    // Try admin table first
    let found: any = null;
    let userRole: string | null = null;
    const admins = await db.select().from(admin).where(eq(admin.username, username));
    if (admins.length > 0) {
      found = admins[0];
      userRole = 'admin';
    } else {
      // Try user table (for residents/others)
      const users = await db.select().from(user).where(eq(user.username, username));
      if (users.length > 0) {
        found = users[0];
        userRole = found.role; // 'guard' or 'resident'
      }
    }
    if (!found) {
      return fail(401, { error: 'Invalid username or password.' });
    }
    // Hash the password with SHA-256
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    if (hash !== found.passwordHash) {
      return fail(401, { error: 'Invalid username or password.' });
    }
    // Set session cookie and store session in DB
    const sessionToken = uuidv4();
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days from now
    await db.insert(sessionTable).values({
      id: sessionId,
      userId: found.id,
      expiresAt
    });
    cookies.set('auth-session', sessionToken, { path: '/', httpOnly: true });
    // Redirect based on role
    if (userRole === 'admin') {
      throw redirect(303, '/admin/dashboard');
    } else if (userRole === 'guard') {
      throw redirect(303, '/guard/dashboard');
    } else if (userRole === 'resident') {
      throw redirect(303, '/user/dashboard');
    } else {
      throw redirect(303, '/'); // fallback
    }
  }
};

// Lucia login logic will be implemented here

export const load = async () => {
  return {};
};
;null as any as Actions;