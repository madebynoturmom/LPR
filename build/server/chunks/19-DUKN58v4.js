import { d as db, a as admin, e as eq, u as user } from './index3-Dp-zUSVy.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import { e as encodeHexLowerCase, s as sha256 } from './hex-C-thOhOU.js';
import './base64-EEv6AAhc.js';
import { g as generateSessionToken, c as createSession, a as setSessionTokenCookie } from './auth-w4Bblj1M.js';
import 'dotenv/config';
import 'better-sqlite3';

const actions = {
  default: async (event) => {
    const { request, cookies } = event;
    const form = await request.formData();
    const username = form.get("username")?.toString().trim();
    const password = form.get("password")?.toString();
    if (!username || !password) {
      console.error("Login failed: Missing username or password");
      return fail(400, { error: "Username and password are required." });
    }
    let found = null;
    let userRole = null;
    const admins = await db.select().from(admin).where(eq(admin.username, username));
    if (admins.length > 0) {
      found = admins[0];
      userRole = "admin";
    } else {
      const users = await db.select().from(user).where(eq(user.username, username));
      if (users.length > 0) {
        found = users[0];
        userRole = found.role;
      }
    }
    if (!found) {
      console.error("Login failed: Invalid username");
      return fail(401, { error: "Invalid username or password." });
    }
    const hash = encodeHexLowerCase(sha256(new TextEncoder().encode(password)));
    if (hash !== found.passwordHash) {
      console.error("Login failed: Invalid password");
      return fail(401, { error: "Invalid username or password." });
    }
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, found.id);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
    if (userRole === "admin") {
      throw redirect(303, "/admin/dashboard");
    } else if (userRole === "guard") {
      throw redirect(303, "/guard/dashboard");
    } else if (userRole === "resident") {
      throw redirect(303, "/user/dashboard");
    } else {
      throw redirect(303, "/");
    }
  }
};
const load = async () => {
  return {};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 19;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BzuwXO6-.js')).default;
const server_id = "src/routes/login/+page.server.ts";
const imports = ["_app/immutable/nodes/19.N81U_yW0.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/CBdOqptF.js"];
const stylesheets = ["_app/immutable/assets/19.NJqmu5VW.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=19-DUKN58v4.js.map
