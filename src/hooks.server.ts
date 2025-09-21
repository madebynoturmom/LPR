import { sequence } from '@sveltejs/kit/hooks';
import * as auth from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});


// Extend App.Locals to include user with role
// declare global {
//        namespace App {
// 	       interface Locals {
// 		       user: {
// 			       id: string;
// 			       username: string;
// 			       role: 'admin' | 'guard' | 'resident';
// 		       } | null;
// 		       session: import('$lib/server/db/schema').Session | null;
// 	       }
//        }
// }

const handleAuth: Handle = async ({ event, resolve }) => {
       const sessionToken = event.cookies.get(auth.sessionCookieName);

       if (!sessionToken) {
	       event.locals.user = null;
	       event.locals.session = null;
	       return resolve(event);
       }

       const { session, user } = await auth.validateSessionToken(sessionToken);

       if (session) {
	       auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
       } else {
	       auth.deleteSessionTokenCookie(event);
       }

			 event.locals.user = user ? { id: user.id, username: user.username, role: user.role } : null;
			 event.locals.session = session;

			   // Handle CORS preflight requests and add conservative CORS response
			   // headers for cross-origin requests. We echo the Origin header when
			   // present (instead of '*') so we can allow credentialed requests.
			   // This keeps behaviour permissive enough for browser fetches while
			   // avoiding a blanket wildcard for credentialed cookies.
			   //
			   // NOTE: If you want to restrict origins in production, replace the
			   // origin echo with a whitelist check.
			   const origin = event.request.headers.get('origin');

			   // Respond immediately to OPTIONS preflight with the necessary headers
			   if (event.request.method === 'OPTIONS') {
				   const headers = new Headers();
				   if (origin) headers.set('access-control-allow-origin', origin);
				   headers.set('access-control-allow-methods', 'GET,POST,PUT,DELETE,OPTIONS');
				   headers.set('access-control-allow-headers', 'Content-Type,Authorization,Accept');
				   // allow cookies in cross-origin requests when origin is echoed
				   if (origin) headers.set('access-control-allow-credentials', 'true');
				   // small cache for preflight
				   headers.set('access-control-max-age', '600');

				   return new Response(null, { status: 204, headers });
			   }

			   const res = await resolve(event);

			   try {
				   // Set CORS headers only when Origin present. We echo the origin so
				   // browsers will accept credentialed responses.
				   if (origin) {
					   res.headers.set('access-control-allow-origin', origin);
					   res.headers.set('access-control-allow-credentials', 'true');
				   }

				   // Conservative CSP: allow scripts from self, permit eval (required by
				   // SvelteKit de/serialization), disallow objects, and enable common
				   // navigational sources. Adjust as needed for production.
				   res.headers.set(
					   'content-security-policy',
					   "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
				   );
			   } catch (e) {
				   // Some response types may not allow header mutation; ignore in that case
			   }

			   return res;
};

export const handle: Handle = sequence(handleParaglide, handleAuth);
