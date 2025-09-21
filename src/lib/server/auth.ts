import type { RequestEvent } from '@sveltejs/kit';
import { eq, desc } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { sendEmail } from './email';


const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
	const session: table.Session = {
		id: sessionId,
		userId,
		// Drizzle sqlite timestamp columns accept Date objects and map them to integer
		expiresAt: expiresAt as unknown as Date
	};
	await db.insert(table.session).values(session);
	// return a session object with expiresAt as Date for callers
	return { ...session, expiresAt };
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	// Try admin table first
	const adminResult = await db
		.select({
			admin: table.admin,
			session: table.session
		})
		.from(table.session)
		.innerJoin(table.admin, eq(table.session.userId, table.admin.id))
		.where(eq(table.session.id, sessionId));
	if (adminResult.length > 0) {
		const { session, admin } = adminResult[0];
		const user = { id: admin.id, username: admin.username, role: 'admin' as const };
		// normalize expiresAt (DB returns integer timestamp)
		if (typeof session.expiresAt === 'number') {
			session.expiresAt = new Date(session.expiresAt as unknown as number) as unknown as Date;
		}
		const sessionExpired = Date.now() >= (session.expiresAt as Date).getTime();
		if (sessionExpired) {
			await db.delete(table.session).where(eq(table.session.id, session.id));
			return { session: null, user: null };
		}
		const renewSession = Date.now() >= (session.expiresAt as Date).getTime() - DAY_IN_MS * 15;
		if (renewSession) {
			const newExpires = new Date(Date.now() + DAY_IN_MS * 30);
			session.expiresAt = newExpires as unknown as Date;
			// write Date to DB; Drizzle will convert Date -> integer timestamp
			await db
				.update(table.session)
				.set({ expiresAt: newExpires as unknown as Date })
				.where(eq(table.session.id, session.id));
			session.expiresAt = newExpires;
		}
		return { session, user };
	}
	// Try user table (resident/guard)
	const userResult = await db
		.select({
			user: { id: table.user.id, username: table.user.username, role: table.user.role },
			session: table.session
		})
		.from(table.session)
		.innerJoin(table.user, eq(table.session.userId, table.user.id))
		.where(eq(table.session.id, sessionId));
	if (userResult.length === 0) {
		return { session: null, user: null };
	}
	const { session, user } = userResult[0];
	// normalize expiresAt (DB returns integer timestamp)
	if (typeof session.expiresAt === 'number') {
		session.expiresAt = new Date(session.expiresAt as unknown as number) as unknown as Date;
	}
	const sessionExpired = Date.now() >= (session.expiresAt as Date).getTime();
	if (sessionExpired) {
		await db.delete(table.session).where(eq(table.session.id, session.id));
		return { session: null, user: null };
	}
	const renewSession = Date.now() >= (session.expiresAt as Date).getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		const newExpires = new Date(Date.now() + DAY_IN_MS * 30);
		session.expiresAt = newExpires as unknown as Date;
		// write Date to DB; Drizzle will convert Date -> integer timestamp
		await db
			.update(table.session)
			.set({ expiresAt: newExpires as unknown as Date })
			.where(eq(table.session.id, session.id));
		session.expiresAt = newExpires;
	}
	return { session, user };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await db.delete(table.session).where(eq(table.session.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	// Determine whether the request is same-origin. If not, browsers require
	// SameSite=None and Secure to allow cookies in cross-site requests. We set
	// Secure only when the current request is over HTTPS. In dev over HTTP,
	// Secure will be false which prevents cross-site cookies from being set.
	const originHeader = event.request.headers.get('origin');
	let sameSite: 'lax' | 'none' = 'lax';
	let secure = false;
	try {
		if (originHeader) {
			const originUrl = new URL(originHeader);
			const sameOrigin = originUrl.origin === event.url.origin;
			if (!sameOrigin) {
				sameSite = 'none';
				secure = event.url.protocol === 'https:';
			}
		} else {
			// No Origin header implies same-origin navigation in most cases
			secure = event.url.protocol === 'https:';
		}
	} catch (e) {
		// If parsing fails, fall back to conservative defaults
		secure = event.url.protocol === 'https:';
	}

	const cookieOptions = {
		expires: expiresAt,
		path: '/',
		httpOnly: true,
		sameSite,
		secure
	} as const;

	console.log(`🔐 setSessionTokenCookie: setting cookie (sameSite=${sameSite}, secure=${secure})`);

	event.cookies.set(sessionCookieName, token, cookieOptions);
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}

