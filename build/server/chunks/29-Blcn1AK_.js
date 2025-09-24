import { r as redirect } from './index-BmA2ZghE.js';
import { d as db, s as session, e as eq } from './index3-CPj-fGVF.js';
import './base64-EEv6AAhc.js';
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

const index = 29;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CRyhKtqO.js')).default;
const server_id = "src/routes/logout/+page.server.ts";
const imports = ["_app/immutable/nodes/29.DaHvkOJy.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=29-Blcn1AK_.js.map
