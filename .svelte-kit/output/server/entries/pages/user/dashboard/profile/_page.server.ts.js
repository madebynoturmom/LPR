import { d as db, u as user } from "../../../../../chunks/index3.js";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import fs from "fs";
import path from "path";
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
export {
  actions,
  load
};
