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

			 // Resolve the request and attach a Content-Security-Policy header.
			 // NOTE: SvelteKit's server-side serialization (devalue/uneval) may
			 // generate inline scripts that rely on runtime evaluation. In strict
			 // CSP environments that disallow 'unsafe-eval' those scripts can fail
			 // to hydrate. Adding 'unsafe-eval' here relaxes that restriction so
			 // hydration and action serialization work correctly. This is a
			 // pragmatic choice for servers that cannot avoid the serialized output.
			 // Security tradeoff: allowing 'unsafe-eval' increases risk of executing
			 // injected code. Only enable it if you understand the implications.
			 const res = await resolve(event);
			 try {
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
