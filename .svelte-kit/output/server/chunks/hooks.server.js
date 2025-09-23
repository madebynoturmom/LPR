import { sequence } from "@sveltejs/kit/hooks";
import { a as sessionCookieName, v as validateSessionToken, s as setSessionTokenCookie, d as deleteSessionTokenCookie } from "./auth.js";
import { o as overwriteServerAsyncLocalStorage, e as extractLocaleFromRequestAsync, s as strategy, l as localizeUrl, d as deLocalizeUrl, a as serverAsyncLocalStorage } from "./runtime.js";
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
  const { session, user } = await validateSessionToken(sessionToken);
  if (session) {
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
  } else {
    deleteSessionTokenCookie(event);
  }
  event.locals.user = user ? { id: user.id, username: user.username, role: user.role } : null;
  event.locals.session = session;
  const origin = event.request.headers.get("origin");
  if (event.request.method === "OPTIONS") {
    const headers2 = new Headers();
    if (origin) headers2.set("access-control-allow-origin", origin);
    headers2.set("access-control-allow-methods", "GET,POST,PUT,DELETE,OPTIONS");
    headers2.set("access-control-allow-headers", "Content-Type,Authorization,Accept");
    if (origin) headers2.set("access-control-allow-credentials", "true");
    headers2.set("access-control-max-age", "600");
    return new Response(null, { status: 204, headers: headers2 });
  }
  const res = await resolve(event);
  const headers = new Headers(res.headers);
  if (origin) {
    headers.set("access-control-allow-origin", origin);
    headers.set("access-control-allow-credentials", "true");
  }
  const isDev = process.env.NODE_ENV !== "production";
  const baseCsp = "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'self';";
  const devExtras = " img-src 'self' data:; style-src 'self' 'unsafe-inline' 'unsafe-hashes' data:; style-src-elem 'self' 'unsafe-inline' data:; style-src-attr 'self' 'unsafe-inline' data:;";
  headers.set("content-security-policy", isDev ? baseCsp + devExtras : baseCsp);
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers
  });
};
const handle = sequence(handleParaglide, handleAuth);
export {
  handle
};
