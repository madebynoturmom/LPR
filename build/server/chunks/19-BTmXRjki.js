import { r as redirect } from './index-BmA2ZghE.js';
import { d as db, s as session, e as eq } from './index3-DE5iFVeB.js';
import './base64-C0uixdOq.js';
import 'dotenv/config';
import 'better-sqlite3';

const actions = {
  default: async (event) => {
    const sessionToken = event.cookies.get("auth-session");
    if (sessionToken) {
      await db.delete(session).where(eq(session.id, sessionToken));
      event.cookies.delete("auth-session", { path: "/" });
    }
    throw redirect(303, "/login");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 19;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CRyhKtqO.js')).default;
const server_id = "src/routes/logout/+page.server.ts";
const imports = ["_app/immutable/nodes/19.haEvUHBP.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=19-BTmXRjki.js.map
