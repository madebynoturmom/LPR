// @ts-nocheck
import { db } from '$lib/server/db';
import { user, admin, session as sessionTable, otp } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import type { Actions } from './$types';
import { eq, desc } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { sendEmail } from '$lib/server/email';

export const actions = {
  default: async (event: import('./$types').RequestEvent) => {
    console.log('🔐 Login Action: Starting');
    const { request } = event;
    const form = await request.formData();
    const username = form.get('username')?.toString().trim();
    const otpCode = form.get('otp')?.toString().trim();

    console.log('🔐 Received form data: username=', username, 'otpCode=', otpCode ? 'provided' : 'not provided');

    if (!username) {
      return fail(400, { error: 'Username is required.' });
    }

    let found: any = null;
    let userRole: string | null = null;
    let userEmail: string | null = null;
    const admins = await db.select().from(admin).where(eq(admin.username, username));
    if (admins.length > 0) {
      found = admins[0];
      userRole = 'admin';
      userEmail = found.email;
    } else {
      const users = await db.select().from(user).where(eq(user.username, username));
      if (users.length > 0) {
        found = users[0];
        userRole = found.role;
        userEmail = found.email;
      }
    }
    if (!found) {
      console.log('🔐 User not found for username:', username);
      return fail(401, { error: 'Invalid username.' });
    }

    if (!userEmail) {
      console.log('🔐 No email associated with user:', username);
      return fail(400, { error: 'No email associated with this user.' });
    }

    console.log('🔐 User found:', username, 'Role:', userRole, 'Email:', userEmail);

    if (!otpCode) {
      console.log('🔐 OTP Generation: Starting for username:', username);
      // Generate OTP
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('🔐 OTP Generated:', code, 'for email:', userEmail);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
      console.log('🔐 OTP Expires At:', expiresAt);
      await db.insert(otp).values({
        id: uuidv4(),
        email: userEmail,
        code,
        expiresAt
      });
      console.log('🔐 OTP Stored in DB');
      // Send email
      console.log('📧 SMTP_USER set:', !!process.env.SMTP_USER);
      console.log('📧 SMTP_PASS set:', !!process.env.SMTP_PASS);
      console.log('📧 Sending OTP email to:', userEmail);
      try {
        await sendEmail(userEmail, 'Your OTP Code', `Your OTP code is: ${code}`);
        console.log('📧 OTP Email sent successfully');
      } catch (emailError) {
        console.error('📧 OTP Email send failed:', emailError);
        return fail(500, { error: 'Failed to send OTP email. Please try again.' });
      }
      const body = { otpSent: true, message: 'OTP sent to your email.' };
      console.log('🔐 Sending back response (action):', body);
      // Actions must return plain serializable objects (or use fail()/redirect()).
      // Return a plain object so SvelteKit can serialize it for the client.
      return body;
    } else {
      console.log('🔐 OTP Verification: Starting for email:', userEmail, 'OTP:', otpCode);
      // Verify OTP
      const otpRecords = await db.select().from(otp).where(eq(otp.email, userEmail)).orderBy(desc(otp.expiresAt));
      console.log('🔐 OTP Records found:', otpRecords.length);
      if (otpRecords.length === 0) {
        console.log('🔐 No OTP records found for email:', userEmail);
        return fail(401, { error: 'No OTP found. Please request a new one.' });
      }
      const latestOtp = otpRecords[0];
      console.log('🔐 Latest OTP:', latestOtp.code, 'Expires:', latestOtp.expiresAt);
      const otpExpiresAt = typeof latestOtp.expiresAt === 'number'
        ? latestOtp.expiresAt
        : new Date(latestOtp.expiresAt).getTime();
      if (Date.now() > otpExpiresAt) {
        console.log('🔐 OTP expired');
        return fail(401, { error: 'OTP expired. Please request a new one.' });
      }
      if (latestOtp.code !== otpCode) {
        console.log('🔐 OTP mismatch: provided', otpCode, 'stored', latestOtp.code);
        return fail(401, { error: 'Invalid OTP.' });
      }
      console.log('🔐 OTP verified successfully');
      // Delete used OTP
      await db.delete(otp).where(eq(otp.id, latestOtp.id));
      console.log('🔐 OTP deleted from DB');

      // Create session
      const sessionToken = auth.generateSessionToken();
      const session = await auth.createSession(sessionToken, found.id);
      auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
      // Determine redirect URL based on role
      const redirectUrl = userRole === 'admin'
        ? '/admin/dashboard'
        : userRole === 'guard'
        ? '/guard/dashboard'
        : userRole === 'resident'
        ? '/user/dashboard'
        : '/';

      // If the client prefers JSON (fetch-based form), return a plain serializable object
      const accept = request.headers.get('accept') || '';
      if (accept.includes('application/json')) {
        return { success: true, redirect: redirectUrl };
      }

      // Otherwise, perform a traditional server redirect for standard form submissions
      throw redirect(303, redirectUrl);
    }
  }
};

// Lucia login logic will be implemented here

export const load = async () => {
  return {};
};
;null as any as Actions;