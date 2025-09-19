import { sequence } from "@sveltejs/kit/hooks";
import { eq } from "drizzle-orm";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { d as db, s as session, b as admin, u as user } from "./index3.js";
import { o as overwriteServerAsyncLocalStorage, e as extractLocaleFromRequestAsync, s as strategy, l as localizeUrl, d as deLocalizeUrl, a as serverAsyncLocalStorage } from "./runtime.js";
const DAY_IN_MS = 1e3 * 60 * 60 * 24;
const sessionCookieName = "auth-session";
async function validateSessionToken(token) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const adminResult = await db.select({
    admin,
    session
  }).from(session).innerJoin(admin, eq(session.userId, admin.id)).where(eq(session.id, sessionId));
  if (adminResult.length > 0) {
    const { session: session2, admin: admin2 } = adminResult[0];
    const user2 = { id: admin2.id, username: admin2.username, role: "admin" };
    const sessionExpired2 = Date.now() >= session2.expiresAt.getTime();
    if (sessionExpired2) {
      await db.delete(session).where(eq(session.id, session2.id));
      return { session: null, user: null };
    }
    const renewSession2 = Date.now() >= session2.expiresAt.getTime() - DAY_IN_MS * 15;
    if (renewSession2) {
      session2.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
      await db.update(session).set({ expiresAt: session2.expiresAt }).where(eq(session.id, session2.id));
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
  const sessionExpired = Date.now() >= session$1.expiresAt.getTime();
  if (sessionExpired) {
    await db.delete(session).where(eq(session.id, session$1.id));
    return { session: null, user: null };
  }
  const renewSession = Date.now() >= session$1.expiresAt.getTime() - DAY_IN_MS * 15;
  if (renewSession) {
    session$1.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
    await db.update(session).set({ expiresAt: session$1.expiresAt }).where(eq(session.id, session$1.id));
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
async function paraglideMiddleware(request, resolve, callbacks) {
  if (!serverAsyncLocalStorage) {
    const { AsyncLocalStorage } = await import("async_hooks");
    overwriteServerAsyncLocalStorage(new AsyncLocalStorage());
  } else if (!serverAsyncLocalStorage) {
    overwriteServerAsyncLocalStorage(createMockAsyncLocalStorage());
  }
  const locale = await extractLocaleFromRequestAsync(request);
  const origin = new URL(request.url).origin;
  if (request.headers.get("Sec-Fetch-Dest") === "document" && strategy.includes("url")) {
    const localizedUrl = localizeUrl(request.url, { locale });
    if (normalizeURL(localizedUrl.href) !== normalizeURL(request.url)) {
      const headers = {};
      if (strategy.includes("preferredLanguage")) {
        headers["Vary"] = "Accept-Language";
      }
      const response2 = new Response(null, {
        status: 307,
        headers: {
          Location: localizedUrl.href,
          ...headers
        }
      });
      return response2;
    }
  }
  const newRequest = strategy.includes("url") ? new Request(deLocalizeUrl(request.url), request) : (
    // need to create a new request object because some metaframeworks (nextjs!) throw otherwise
    // https://github.com/opral/inlang-paraglide-js/issues/411
    new Request(request)
  );
  const messageCalls = /* @__PURE__ */ new Set();
  const response = await serverAsyncLocalStorage?.run({ locale, origin, messageCalls }, () => resolve({ locale, request: newRequest }));
  return response;
}
function normalizeURL(url) {
  const urlObj = new URL(url);
  urlObj.pathname = urlObj.pathname.replace(/\/$/, "");
  return urlObj.href;
}
function createMockAsyncLocalStorage() {
  let currentStore = void 0;
  return {
    getStore() {
      return currentStore;
    },
    async run(store, callback) {
      currentStore = store;
      try {
        return await callback();
      } finally {
        currentStore = void 0;
      }
    }
  };
}
const handleParaglide = ({ event, resolve }) => paraglideMiddleware(event.request, ({ request, locale }) => {
  event.request = request;
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%paraglide.lang%", locale)
  });
});
const handleAuth = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get(sessionCookieName);
  if (!sessionToken) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }
  const { session: session2, user: user2 } = await validateSessionToken(sessionToken);
  if (session2) {
    setSessionTokenCookie(event, sessionToken, session2.expiresAt);
  } else {
    deleteSessionTokenCookie(event);
  }
  event.locals.user = user2 ? { id: user2.id, username: user2.username, role: user2.role } : null;
  event.locals.session = session2;
  return resolve(event);
};
const handle = sequence(handleParaglide, handleAuth);
export {
  handle
};
