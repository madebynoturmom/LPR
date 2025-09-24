import { eq } from "drizzle-orm";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase64url, encodeHexLowerCase } from "@oslojs/encoding";
import { d as db, s as session, a as admin, u as user } from "./index3.js";
import "./email.js";
const DAY_IN_MS = 1e3 * 60 * 60 * 24;
const sessionCookieName = "auth-session";
function generateSessionToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  const token = encodeBase64url(bytes);
  return token;
}
async function createSession(token, userId, ttlMs = DAY_IN_MS * 30) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const expiresAt = new Date(Date.now() + ttlMs);
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
  const originHeader = event.request.headers.get("origin");
  let sameSite = "lax";
  let secure = false;
  try {
    if (originHeader) {
      const originUrl = new URL(originHeader);
      const sameOrigin = originUrl.origin === event.url.origin;
      if (!sameOrigin) {
        sameSite = "none";
        secure = event.url.protocol === "https:";
      }
    } else {
      secure = event.url.protocol === "https:";
    }
  } catch (e) {
    secure = event.url.protocol === "https:";
  }
  try {
    const fwd = event.request.headers.get("x-forwarded-proto") || event.request.headers.get("x-forwarded-ssl");
    if (fwd && !secure) {
      const proto = fwd.split(",")[0].trim().toLowerCase();
      if (proto === "https" || proto === "on") secure = true;
    }
  } catch (e) {
  }
  const cookieOptions = {
    expires: expiresAt,
    path: "/",
    httpOnly: true,
    sameSite,
    secure
  };
  console.log(`🔐 setSessionTokenCookie: setting cookie (sameSite=${sameSite}, secure=${secure})`);
  event.cookies.set(sessionCookieName, token, cookieOptions);
}
function deleteSessionTokenCookie(event) {
  event.cookies.delete(sessionCookieName, {
    path: "/"
  });
}
export {
  DAY_IN_MS as D,
  sessionCookieName as a,
  createSession as c,
  deleteSessionTokenCookie as d,
  generateSessionToken as g,
  setSessionTokenCookie as s,
  validateSessionToken as v
};
