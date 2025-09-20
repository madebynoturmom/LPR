import { d as db, g as guard } from './index3-Dp-zUSVy.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const name = form.get("name")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const guards = await db.select().from(guard);
    const maxNum = guards.map((g) => typeof g.guardId === "string" && g.guardId.startsWith("G") ? parseInt(g.guardId.slice(1), 10) : 0).reduce((max, n) => n > max ? n : max, 0);
    const nextNum = maxNum + 1;
    const guardId = `G${nextNum.toString().padStart(3, "0")}`;
    const file = form.get("profilePic");
    let profilePic = null;
    if (file && typeof file === "object" && "arrayBuffer" in file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      profilePic = `data:${file.type};base64,${buffer.toString("base64")}`;
    }
    if (!name || !phone || !guardId) {
      return fail(400, { error: "All fields are required." });
    }
    try {
      await db.insert(guard).values({
        username: guardId,
        name,
        phone,
        guardId,
        profilePic
      });
      throw redirect(303, "/admin/dashboard/guards");
    } catch (e) {
      return fail(500, { error: "Failed to create guard." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BTWTR5F5.js')).default;
const server_id = "src/routes/admin/dashboard/guards/create/+page.server.ts";
const imports = ["_app/immutable/nodes/10.BXkeCB8g.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/tQRZQKdW.js"];
const stylesheets = ["_app/immutable/assets/10.B5cHOmNV.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-DqgS-_C7.js.map
