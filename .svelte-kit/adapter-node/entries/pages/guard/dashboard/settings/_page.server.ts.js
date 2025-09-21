import { fail } from "@sveltejs/kit";
import { d as db, b as guard } from "../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import "../../../../../chunks/email.js";
import fs from "fs";
import path from "path";
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
export {
  actions,
  load
};
