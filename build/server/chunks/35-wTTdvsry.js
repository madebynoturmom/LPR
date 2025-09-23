import { d as db, u as user, e as eq } from './index3-CPj-fGVF.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import { e as encodeHexLowerCase, s as sha256 } from './hex-C-thOhOU.js';
import './base64-EEv6AAhc.js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import 'better-sqlite3';

const load = async ({ locals }) => {
  const user$1 = locals.user;
  if (!user$1) throw redirect(303, "/login");
  const users = await db.select().from(user).where(eq(user.id, user$1.id));
  if (!users.length) throw redirect(303, "/login");
  const userData = users[0];
  return { user: userData };
};
const actions = {
  default: async ({ request, locals }) => {
    const user$1 = locals.user;
    if (!user$1) return fail(401, { error: "Not authenticated." });
    const form = await request.formData();
    const name = form.get("name")?.toString();
    const email = form.get("email")?.toString();
    const username = form.get("username")?.toString();
    const password = form.get("password")?.toString();
    const phone = form.get("phone")?.toString();
    const houseAddress = form.get("houseAddress")?.toString();
    let profilePic = void 0;
    const file = form.get("profilePicture");
    if (file && file.size > 0) {
      const uploadDir = path.resolve("static/uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const fileName = `user_${user$1.id}_${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      profilePic = `/uploads/${fileName}`;
    }
    const updateData = { name, email, username, phone, houseAddress };
    if (profilePic) updateData.profilePic = profilePic;
    if (password && password.length > 0) {
      updateData.passwordHash = encodeHexLowerCase(sha256(new TextEncoder().encode(password)));
    }
    await db.update(user).set(updateData).where(eq(user.id, user$1.id));
    return { success: true };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 35;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C7lkCwrB.js')).default;
const server_id = "src/routes/user/dashboard/profile/+page.server.ts";
const imports = ["_app/immutable/nodes/35.DxDq6axt.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/STPvjbMu.js","_app/immutable/chunks/5UxS6Hio.js","_app/immutable/chunks/CdEA5IGF.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js","_app/immutable/chunks/CprSpIeg.js","_app/immutable/chunks/CK-fib3O.js","_app/immutable/chunks/BQQlMUYl.js","_app/immutable/chunks/D5ruwRzR.js","_app/immutable/chunks/tN8zdOQx.js"];
const stylesheets = ["_app/immutable/assets/35.CyCuE_fj.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=35-wTTdvsry.js.map
