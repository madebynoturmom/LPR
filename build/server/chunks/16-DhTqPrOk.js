import { r as redirect } from './index-BmA2ZghE.js';
import { d as db, a as admin, e as eq } from './index3-Dp-zUSVy.js';
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

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DcoS409m.js')).default;
const server_id = "src/routes/admin/dashboard/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/16.CqDVFvla.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/-kgmExda.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/Cdivgpra.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/CBdOqptF.js","_app/immutable/chunks/D4Caz1gY.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js","_app/immutable/chunks/BIKuTJgm.js","_app/immutable/chunks/DioV78hU.js","_app/immutable/chunks/DC2F6t9P.js"];
const stylesheets = ["_app/immutable/assets/16.DSsgAKWg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=16-DhTqPrOk.js.map
