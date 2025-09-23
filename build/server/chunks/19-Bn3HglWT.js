import { r as redirect } from './index-BmA2ZghE.js';
import { d as db, a as admin, e as eq } from './index3-CPj-fGVF.js';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import 'better-sqlite3';

const load = async ({ locals }) => {
  const user = locals.user;
  if (!user) throw redirect(302, "/login");
  if (user.role !== "admin") throw redirect(302, "/");
  const [adminRow] = await db.select().from(admin).where(eq(admin.id, user.id));
  return { user: adminRow };
};
const actions = {
  default: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) throw redirect(302, "/login");
    if (user.role !== "admin") throw redirect(302, "/");
    const form = await request.formData();
    const name = form.get("name");
    const email = form.get("email");
    const username = form.get("username");
    const password = form.get("password");
    let profilePic = void 0;
    const file = form.get("profilePicture");
    if (file && file.size > 0) {
      const uploadDir = path.resolve("static/uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const fileName = `admin_${user.id}_${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      profilePic = `/uploads/${fileName}`;
    }
    const updateData = { name, email, username };
    if (profilePic) updateData.profilePic = profilePic;
    if (password && password.length > 0) {
      updateData.passwordHash = crypto.createHash("sha256").update(password).digest("hex");
    }
    await db.update(admin).set(updateData).where(eq(admin.id, user.id));
    return { success: true };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 19;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CWrdCKX4.js')).default;
const server_id = "src/routes/admin/dashboard/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/19.DstW3Mpz.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/BQQlMUYl.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/D5ruwRzR.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/STPvjbMu.js","_app/immutable/chunks/5UxS6Hio.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js","_app/immutable/chunks/CprSpIeg.js","_app/immutable/chunks/CK-fib3O.js","_app/immutable/chunks/tN8zdOQx.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=19-Bn3HglWT.js.map
