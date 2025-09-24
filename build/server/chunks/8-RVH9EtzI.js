import { d as db, a as admin } from './index3-CPj-fGVF.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';
import 'better-sqlite3';

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

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D0JJbwU8.js')).default;
const server_id = "src/routes/admin/dashboard/admins/create/+page.server.ts";
const imports = ["_app/immutable/nodes/8.o7aJe7HQ.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/BnZ110ug.js","_app/immutable/chunks/DnwoYYiD.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/WNbVgFxQ.js","_app/immutable/chunks/BaSLTKbU.js","_app/immutable/chunks/CsTGPyzP.js","_app/immutable/chunks/BSK96_y8.js","_app/immutable/chunks/Ctr7oTW1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-RVH9EtzI.js.map
