import { d as db, u as user } from "../../../../../chunks/index3.js";
import { redirect, fail } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import fs from "fs";
import path from "path";
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
export {
  actions,
  load
};
