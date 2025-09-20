import { d as db, u as user, e as eq } from './index3-Dp-zUSVy.js';
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

const index = 27;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BEfZqfjQ.js')).default;
const server_id = "src/routes/user/dashboard/profile/+page.server.ts";
const imports = ["_app/immutable/nodes/27.BFSgZAbe.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/CBdOqptF.js","_app/immutable/chunks/D4Caz1gY.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js","_app/immutable/chunks/Cetg04vO.js","_app/immutable/chunks/CmBdg4qq.js","_app/immutable/chunks/-kgmExda.js","_app/immutable/chunks/Cdivgpra.js","_app/immutable/chunks/CXo3jt2d.js"];
const stylesheets = ["_app/immutable/assets/27.CyCuE_fj.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=27-CAPiK1Ec.js.map
