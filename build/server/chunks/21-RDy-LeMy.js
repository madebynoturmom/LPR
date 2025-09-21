import { f as fail } from './index-BmA2ZghE.js';
import { d as db, g as guard, e as eq } from './index3-DfwD5jMB.js';
import { e as encodeHexLowerCase, s as sha256 } from './hex-C-thOhOU.js';
import './base64-EEv6AAhc.js';
import './email-REl8RnBL.js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import 'better-sqlite3';
import 'nodemailer';

function requireGuard(locals) {
  if (!locals.user || locals.user.role !== "guard") throw new Error("Unauthorized");
}
const actions = {
  updateProfile: async ({ request, locals }) => {
    if (!locals.user) return fail(403, { error: "Not authorized" });
    try {
      requireGuard(locals);
    } catch (e) {
      return fail(403, { error: "Not authorized" });
    }
    const form = await request.formData();
    const file = form.get("profilePicture");
    let profilePic = void 0;
    if (file && file.size > 0) {
      const uploadDir = path.resolve("static/uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const fileName = `guard_${locals.user.id}_${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      profilePic = `/uploads/${fileName}`;
    }
    const updateData = {};
    if (profilePic) updateData.profilePic = profilePic;
    if (Object.keys(updateData).length === 0) return { success: true, message: "No changes" };
    const guardIdNum = Number(locals.user.id);
    await db.update(guard).set(updateData).where(eq(guard.id, guardIdNum));
    return { success: true, message: "Profile updated" };
  },
  changePassword: async ({ request, locals }) => {
    if (!locals.user) return fail(403, { error: "Not authorized" });
    try {
      requireGuard(locals);
    } catch (e) {
      return fail(403, { error: "Not authorized" });
    }
    const form = await request.formData();
    const currentPassword = form.get("currentPassword")?.toString() || "";
    const newPassword = form.get("newPassword")?.toString() || "";
    if (!currentPassword || !newPassword) return fail(400, { error: "Both current and new passwords are required" });
    const guardId = Number(locals.user.id);
    const rows = await db.select().from(guard).where(eq(guard.id, guardId));
    if (rows.length === 0) return fail(404, { error: "Guard not found" });
    const row = rows[0];
    const currentHash = encodeHexLowerCase(sha256(new TextEncoder().encode(currentPassword)));
    if (!row.passwordHash || currentHash !== row.passwordHash) return fail(401, { error: "Current password incorrect" });
    const newHash = encodeHexLowerCase(sha256(new TextEncoder().encode(newPassword)));
    await db.update(guard).set({ passwordHash: newHash }).where(eq(guard.id, guardId));
    return { success: true, message: "Password updated" };
  }
};
async function load({ locals }) {
  try {
    requireGuard(locals);
  } catch (e) {
    return { status: 302 };
  }
  return { user: locals.user };
}

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 21;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CnyaKHK7.js')).default;
const server_id = "src/routes/guard/dashboard/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/21.BDhZ1liB.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/BdvQLAZU.js","_app/immutable/chunks/BfIrQ_zr.js","_app/immutable/chunks/Cko499XQ.js","_app/immutable/chunks/CdEA5IGF.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js","_app/immutable/chunks/DTIvn4B3.js","_app/immutable/chunks/DNr0OUhH.js","_app/immutable/chunks/G6y-YXti.js","_app/immutable/chunks/CYxAlzJ1.js","_app/immutable/chunks/D27ElQeU.js"];
const stylesheets = ["_app/immutable/assets/21.C0S5zQSb.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=21-RDy-LeMy.js.map
