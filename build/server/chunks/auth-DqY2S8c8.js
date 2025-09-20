import { e as encodeHexLowerCase, s as sha256 } from './hex-C-thOhOU.js';
import { e as encodeBase64url } from './base64-EEv6AAhc.js';
import { d as db, h as session, a as admin, e as eq, u as user } from './index3-DTrFeyBm.js';
import './email-REl8RnBL.js';

const DAY_IN_MS = 1e3 * 60 * 60 * 24;
const sessionCookieName = "auth-session";
function generateSessionToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  const token = encodeBase64url(bytes);
  return token;
}
async function createSession(token, userId) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
  const session$1 = {
    id: sessionId,
    userId,
    // Drizzle sqlite timestamp columns accept Date objects and map them to integer
    expiresAt
  };
  await db.insert(session).values(session$1);
  return { ...session$1, expiresAt };
}
async function validateSessionToken(token) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const adminResult = await db.select({
    admin,
    session
  }).from(session).innerJoin(admin, eq(session.userId, admin.id)).where(eq(session.id, sessionId));
  if (adminResult.length > 0) {
    const { session: session2, admin: admin2 } = adminResult[0];
    const user2 = { id: admin2.id, username: admin2.username, role: "admin" };
    if (typeof session2.expiresAt === "number") {
      session2.expiresAt = new Date(session2.expiresAt);
    }
    const sessionExpired2 = Date.now() >= session2.expiresAt.getTime();
    if (sessionExpired2) {
      await db.delete(session).where(eq(session.id, session2.id));
      return { session: null, user: null };
    }
    const renewSession2 = Date.now() >= session2.expiresAt.getTime() - DAY_IN_MS * 15;
    if (renewSession2) {
      const newExpires = new Date(Date.now() + DAY_IN_MS * 30);
      session2.expiresAt = newExpires;
      await db.update(session).set({ expiresAt: newExpires }).where(eq(session.id, session2.id));
      session2.expiresAt = newExpires;
    }
    return { session: session2, user: user2 };
  }
  const userResult = await db.select({
    user: { id: user.id, username: user.username, role: user.role },
    session
  }).from(session).innerJoin(user, eq(session.userId, user.id)).where(eq(session.id, sessionId));
  if (userResult.length === 0) {
    return { session: null, user: null };
  }
  const { session: session$1, user: user$1 } = userResult[0];
  if (typeof session$1.expiresAt === "number") {
    session$1.expiresAt = new Date(session$1.expiresAt);
  }
  const sessionExpired = Date.now() >= session$1.expiresAt.getTime();
  if (sessionExpired) {
    await db.delete(session).where(eq(session.id, session$1.id));
    return { session: null, user: null };
  }
  const renewSession = Date.now() >= session$1.expiresAt.getTime() - DAY_IN_MS * 15;
  if (renewSession) {
    const newExpires = new Date(Date.now() + DAY_IN_MS * 30);
    session$1.expiresAt = newExpires;
    await db.update(session).set({ expiresAt: newExpires }).where(eq(session.id, session$1.id));
    session$1.expiresAt = newExpires;
  }
  return { session: session$1, user: user$1 };
}
function setSessionTokenCookie(event, token, expiresAt) {
  event.cookies.set(sessionCookieName, token, {
    expires: expiresAt,
    path: "/"
  });
}
function deleteSessionTokenCookie(event) {
  event.cookies.delete(sessionCookieName, {
    path: "/"
  });
}

export { setSessionTokenCookie as a, createSession as c, deleteSessionTokenCookie as d, generateSessionToken as g, sessionCookieName as s, validateSessionToken as v };
//# sourceMappingURL=auth-DqY2S8c8.js.map
