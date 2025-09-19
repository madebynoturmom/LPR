import { g as get_request_store, m as merge_tracing, w as with_request_store } from './index-D7e6r4Ku.js';
import { e as encodeHexLowerCase, s as sha256 } from './hex-C-thOhOU.js';
import './base64-C0uixdOq.js';
import { d as db, s as session, a as admin, e as eq, u as user } from './index3-DE5iFVeB.js';
import { o as overwriteServerAsyncLocalStorage, e as extractLocaleFromRequestAsync, s as strategy, l as localizeUrl, d as deLocalizeUrl, a as serverAsyncLocalStorage } from './runtime-BtFSyhoa.js';
import './exports-4vquAdf5.js';
import './index-BmA2ZghE.js';
import './index-DOLwiM6w.js';
import './utils2-JZdwKo0Y.js';
import './context-DXUidelg.js';
import './index2-yPxTiqcs.js';
import './attributes-BdjbuRwA.js';
import './escaping-CqgfEcN3.js';
import 'dotenv/config';
import 'better-sqlite3';

/** @import { Handle, RequestEvent, ResolveOptions } from '@sveltejs/kit' */
/** @import { MaybePromise } from 'types' */

/**
 * A helper function for sequencing multiple `handle` calls in a middleware-like manner.
 * The behavior for the `handle` options is as follows:
 * - `transformPageChunk` is applied in reverse order and merged
 * - `preload` is applied in forward order, the first option "wins" and no `preload` options after it are called
 * - `filterSerializedResponseHeaders` behaves the same as `preload`
 *
 * ```js
 * /// file: src/hooks.server.js
 * import { sequence } from '@sveltejs/kit/hooks';
 *
 * /// type: import('@sveltejs/kit').Handle
 * async function first({ event, resolve }) {
 * 	console.log('first pre-processing');
 * 	const result = await resolve(event, {
 * 		transformPageChunk: ({ html }) => {
 * 			// transforms are applied in reverse order
 * 			console.log('first transform');
 * 			return html;
 * 		},
 * 		preload: () => {
 * 			// this one wins as it's the first defined in the chain
 * 			console.log('first preload');
 * 			return true;
 * 		}
 * 	});
 * 	console.log('first post-processing');
 * 	return result;
 * }
 *
 * /// type: import('@sveltejs/kit').Handle
 * async function second({ event, resolve }) {
 * 	console.log('second pre-processing');
 * 	const result = await resolve(event, {
 * 		transformPageChunk: ({ html }) => {
 * 			console.log('second transform');
 * 			return html;
 * 		},
 * 		preload: () => {
 * 			console.log('second preload');
 * 			return true;
 * 		},
 * 		filterSerializedResponseHeaders: () => {
 * 			// this one wins as it's the first defined in the chain
 * 			console.log('second filterSerializedResponseHeaders');
 * 			return true;
 * 		}
 * 	});
 * 	console.log('second post-processing');
 * 	return result;
 * }
 *
 * export const handle = sequence(first, second);
 * ```
 *
 * The example above would print:
 *
 * ```
 * first pre-processing
 * first preload
 * second pre-processing
 * second filterSerializedResponseHeaders
 * second transform
 * first transform
 * second post-processing
 * first post-processing
 * ```
 *
 * @param {...Handle} handlers The chain of `handle` functions
 * @returns {Handle}
 */
function sequence(...handlers) {
	const length = handlers.length;
	if (!length) return ({ event, resolve }) => resolve(event);

	return ({ event, resolve }) => {
		const { state } = get_request_store();
		return apply_handle(0, event, {});

		/**
		 * @param {number} i
		 * @param {RequestEvent} event
		 * @param {ResolveOptions | undefined} parent_options
		 * @returns {MaybePromise<Response>}
		 */
		function apply_handle(i, event, parent_options) {
			const handle = handlers[i];

			return state.tracing.record_span({
				name: `sveltekit.handle.sequenced.${handle.name ? handle.name : i}`,
				attributes: {},
				fn: async (current) => {
					const traced_event = merge_tracing(event, current);
					return await with_request_store({ event: traced_event, state }, () =>
						handle({
							event: traced_event,
							resolve: (event, options) => {
								/** @type {ResolveOptions['transformPageChunk']} */
								const transformPageChunk = async ({ html, done }) => {
									if (options?.transformPageChunk) {
										html = (await options.transformPageChunk({ html, done })) ?? '';
									}

									if (parent_options?.transformPageChunk) {
										html = (await parent_options.transformPageChunk({ html, done })) ?? '';
									}

									return html;
								};

								/** @type {ResolveOptions['filterSerializedResponseHeaders']} */
								const filterSerializedResponseHeaders =
									parent_options?.filterSerializedResponseHeaders ??
									options?.filterSerializedResponseHeaders;

								/** @type {ResolveOptions['preload']} */
								const preload = parent_options?.preload ?? options?.preload;

								return i < length - 1
									? apply_handle(i + 1, event, {
											transformPageChunk,
											filterSerializedResponseHeaders,
											preload
										})
									: resolve(event, {
											transformPageChunk,
											filterSerializedResponseHeaders,
											preload
										});
							}
						})
					);
				}
			});
		}
	};
}

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
    const { AsyncLocalStorage } = await import('async_hooks');
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

export { handle };
//# sourceMappingURL=hooks.server-FvweBPnI.js.map
