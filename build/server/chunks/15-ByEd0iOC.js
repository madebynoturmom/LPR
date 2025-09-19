import { r as redirect } from './index-BmA2ZghE.js';
import { d as db, a as admin, e as eq } from './index3-DE5iFVeB.js';
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

const index = 15;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BVQkg2wE.js')).default;
const server_id = "src/routes/admin/dashboard/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/15.ByPdFLtY.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/DJtz8HCy.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CmkkP05h.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/Cpx9Zc3b.js","_app/immutable/chunks/D4Caz1gY.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js","_app/immutable/chunks/C5ccUtUr.js","_app/immutable/chunks/DfxkLT-v.js","_app/immutable/chunks/BqEnfvlG.js"];
const stylesheets = ["_app/immutable/assets/15.DSsgAKWg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=15-ByEd0iOC.js.map
