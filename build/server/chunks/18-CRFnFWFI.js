import { d as db, a as admin, e as eq, u as user, s as session } from './index3-DE5iFVeB.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import { v4 } from 'uuid';
import { e as encodeHexLowerCase, s as sha256 } from './hex-C-thOhOU.js';
import './base64-C0uixdOq.js';
import crypto from 'crypto';
import 'dotenv/config';
import 'better-sqlite3';

const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const username = form.get("username")?.toString().trim();
    const password = form.get("password")?.toString();
    if (!username || !password) {
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
      return fail(401, { error: "Invalid username or password." });
    }
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    if (hash !== found.passwordHash) {
      return fail(401, { error: "Invalid username or password." });
    }
    const sessionToken = v4();
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
    const expiresAt = new Date(Date.now() + 1e3 * 60 * 60 * 24 * 7);
    await db.insert(session).values({
      id: sessionId,
      userId: found.id,
      expiresAt
    });
    cookies.set("auth-session", sessionToken, { path: "/", httpOnly: true });
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

const index = 18;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CILSkVXA.js')).default;
const server_id = "src/routes/login/+page.server.ts";
const imports = ["_app/immutable/nodes/18._XpzMrVP.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/Cpx9Zc3b.js"];
const stylesheets = ["_app/immutable/assets/18.NJqmu5VW.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=18-CRFnFWFI.js.map
