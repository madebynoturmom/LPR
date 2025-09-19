import { d as db, u as user, e as eq } from './index3-DE5iFVeB.js';
import { r as redirect } from './index-BmA2ZghE.js';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import 'better-sqlite3';

function getUserIdFromSession(cookies) {
  return "R001";
}
const load = async ({ cookies }) => {
  const userId = getUserIdFromSession();
  const users = await db.select().from(user).where(eq(user.id, userId));
  if (!users.length) throw redirect(303, "/login");
  const user$1 = users[0];
  return { user: user$1 };
};
const actions = {
  default: async ({ request, cookies }) => {
    const userId = getUserIdFromSession();
    const form = await request.formData();
    const name = form.get("name")?.toString();
    const email = form.get("email")?.toString();
    const username = form.get("username")?.toString();
    const password = form.get("password")?.toString();
    const phone = form.get("phone")?.toString();
    const houseNumber = form.get("houseNumber")?.toString();
    const carNumber = form.get("carNumber")?.toString();
    let profilePic = void 0;
    const file = form.get("profilePicture");
    if (file && file.size > 0) {
      const uploadDir = path.resolve("static/uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const fileName = `user_${userId}_${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      profilePic = `/uploads/${fileName}`;
    }
    const updateData = { name, email, username, phone, houseNumber, carNumber };
    if (profilePic) updateData.profilePic = profilePic;
    if (password && password.length > 0) {
      updateData.passwordHash = crypto.createHash("sha256").update(password).digest("hex");
    }
    await db.update(user).set(updateData).where(eq(user.id, userId));
    return { success: true };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 25;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BPvBByRE.js')).default;
const server_id = "src/routes/user/dashboard/profile/+page.server.ts";
const imports = ["_app/immutable/nodes/25.60WNEVw5.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/Cpx9Zc3b.js","_app/immutable/chunks/D4Caz1gY.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/BqEnfvlG.js","_app/immutable/chunks/DJtz8HCy.js","_app/immutable/chunks/CmkkP05h.js","_app/immutable/chunks/Xyw_xob0.js"];
const stylesheets = ["_app/immutable/assets/25.CyCuE_fj.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=25-CTPP5uVR.js.map
