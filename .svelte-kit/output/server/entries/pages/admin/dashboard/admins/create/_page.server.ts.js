import { d as db, a as admin } from "../../../../../../chunks/index3.js";
import { fail, redirect } from "@sveltejs/kit";
import path from "path";
import fs from "fs";
async function getNextAdminId() {
  const admins = await db.select().from(admin);
  const maxNum = admins.map((a) => typeof a.id === "string" && a.id.startsWith("A") ? parseInt(a.id.slice(1), 10) : 0).reduce((max, n) => n > max ? n : max, 0);
  const nextNum = maxNum + 1;
  return `A${nextNum.toString().padStart(3, "0")}`;
}
const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const username = form.get("username");
    const passwordHash = form.get("passwordHash");
    const name = form.get("name");
    const email = form.get("email");
    const phone = form.get("phone");
    const profilePic = form.get("profilePic");
    let profilePicUrl = null;
    if (profilePic && typeof profilePic !== "string" && "arrayBuffer" in profilePic) {
      const buffer = Buffer.from(await profilePic.arrayBuffer());
      const ext = profilePic.name.split(".").pop() || "png";
      const fileName = `admin_${Date.now()}.${ext}`;
      const uploadPath = path.join("static", "uploads", fileName);
      fs.writeFileSync(uploadPath, buffer);
      profilePicUrl = `/uploads/${fileName}`;
    } else if (typeof profilePic === "string") {
      profilePicUrl = profilePic;
    }
    if (typeof username !== "string" || typeof passwordHash !== "string") {
      return fail(400, { error: "Username and password are required." });
    }
    const id = await getNextAdminId();
    await db.insert(admin).values({
      id,
      username,
      passwordHash,
      name: typeof name === "string" ? name : null,
      email: typeof email === "string" ? email : null,
      phone: typeof phone === "string" ? phone : null,
      profilePic: profilePicUrl
    });
    throw redirect(303, "/admin/dashboard/admins");
  }
};
export {
  actions
};
