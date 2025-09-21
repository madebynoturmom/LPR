import { g as get_request_store, m as merge_tracing, w as with_request_store } from './index-uZvrt03B.js';
import { s as sessionCookieName, v as validateSessionToken, a as setSessionTokenCookie, d as deleteSessionTokenCookie } from './auth-Be8Jj8Sg.js';
import { o as overwriteServerAsyncLocalStorage, e as extractLocaleFromRequestAsync, s as strategy, l as localizeUrl, d as deLocalizeUrl, a as serverAsyncLocalStorage } from './runtime-BtFSyhoa.js';
import './exports-4vquAdf5.js';
import './index-BmA2ZghE.js';
import './index-B6AxQKWr.js';
import './escaping-CItVpVa9.js';
import './context-DXUidelg.js';
import './index2-D53USUVF.js';
import './attributes-CgdCmHPy.js';
import 'cookie';
import './hex-C-thOhOU.js';
import './base64-EEv6AAhc.js';
import './index3-DfwD5jMB.js';
import 'dotenv/config';
import 'better-sqlite3';
import './email-REl8RnBL.js';
import 'nodemailer';

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
  const { session, user } = await validateSessionToken(sessionToken);
  if (session) {
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
  } else {
    deleteSessionTokenCookie(event);
  }
  event.locals.user = user ? { id: user.id, username: user.username, role: user.role } : null;
  event.locals.session = session;
  const res = await resolve(event);
  try {
    res.headers.set(
      "content-security-policy",
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
    );
  } catch (e) {
  }
  return res;
};
const handle = sequence(handleParaglide, handleAuth);

export { handle };
//# sourceMappingURL=hooks.server-DdiUiL0u.js.map
