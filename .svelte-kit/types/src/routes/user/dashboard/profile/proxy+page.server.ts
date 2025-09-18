// @ts-nocheck
import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Dummy session logic: replace with real session extraction
function getUserIdFromSession(cookies: any): string | null {
  // In production, decode the session cookie and fetch userId
  return 'R001'; // For demo
}

export const load = async ({ cookies }: Parameters<PageServerLoad>[0]) => {
  const userId = getUserIdFromSession(cookies);
  if (!userId) throw redirect(303, '/login');
  const users = await db.select().from(userTable).where(eq(userTable.id, userId));
  if (!users.length) throw redirect(303, '/login');
  const user = users[0];
  return { user };
};

export const actions = {
  default: async ({ request, cookies }: import('./$types').RequestEvent) => {
    const userId = getUserIdFromSession(cookies);
    if (!userId) return fail(401, { error: 'Not authenticated.' });
    const form = await request.formData();
    const name = form.get('name')?.toString();
    const email = form.get('email')?.toString();
    const username = form.get('username')?.toString();
    const password = form.get('password')?.toString();
    const phone = form.get('phone')?.toString();
    const houseNumber = form.get('houseNumber')?.toString();
    const carNumber = form.get('carNumber')?.toString();
    let profilePic = undefined;
    const file = form.get('profilePicture') as File | null;
    if (file && file.size > 0) {
      const uploadDir = path.resolve('static/uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const fileName = `user_${userId}_${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      profilePic = `/uploads/${fileName}`;
    }
    const updateData: Record<string, any> = { name, email, username, phone, houseNumber, carNumber };
    if (profilePic) updateData.profilePic = profilePic;
    if (password && password.length > 0) {
      updateData.passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    }
    await db.update(userTable)
      .set(updateData)
      .where(eq(userTable.id, userId));
    return { success: true };
  }
};
;null as any as Actions;