import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import { d as db, u as user, e as eq, c as eventLog } from './index3-DTrFeyBm.js';
import { e as encodeHexLowerCase, s as sha256 } from './hex-C-thOhOU.js';
import './base64-EEv6AAhc.js';
import './email-REl8RnBL.js';
import 'dotenv/config';
import 'better-sqlite3';
import 'nodemailer';

const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const carNumber = form.get("carNumber")?.toString().trim();
    const houseAddress = form.get("houseAddress")?.toString().trim();
    if (!name || !email || !phone || !carNumber || !houseAddress) {
      return fail(400, { error: "All fields are required." });
    }
    const residents = await db.select().from(user).where(eq(user.role, "resident"));
    const userNumbers = residents.map((r) => typeof r.username === "string" && r.username.startsWith("user") ? parseInt(r.username.slice(4), 10) : 0).filter((n) => n > 0);
    const maxUserNum = userNumbers.length > 0 ? Math.max(...userNumbers) : 0;
    const nextUserNum = maxUserNum + 1;
    const username = `user${nextUserNum}`;
    const plainPassword = username;
    const maxNum = residents.map((r) => typeof r.id === "string" && r.id.startsWith("R") ? parseInt(r.id.slice(1), 10) : 0).reduce((max, n) => n > max ? n : max, 0);
    const nextNum = maxNum + 1;
    const id = `R${nextNum.toString().padStart(3, "0")}`;
    const passwordHash = encodeHexLowerCase(sha256(new TextEncoder().encode(plainPassword)));
    try {
      await db.insert(user).values({
        id,
        username,
        passwordHash,
        role: "resident",
        name,
        email,
        phone,
        carNumber,
        houseAddress
      });
      try {
        const evId = `E${Date.now()}`;
        await db.insert(eventLog).values({
          id: evId,
          type: "resident_created",
          userId: username,
          details: `Created resident ${name} (${id})`,
          timestamp: /* @__PURE__ */ new Date()
        });
      } catch (logErr) {
        console.error("Failed to write event log", logErr);
      }
      throw redirect(303, "/admin/dashboard/residents?created=1");
    } catch (e) {
      return fail(500, { error: "Failed to create resident." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 15;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-XmnStlOP.js')).default;
const server_id = "src/routes/admin/dashboard/residents/create/+page.server.ts";
const imports = ["_app/immutable/nodes/15.BJ7QwbNw.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/D6O3RN6I.js","_app/immutable/chunks/CdEA5IGF.js","_app/immutable/chunks/BbceK8gy.js"];
const stylesheets = ["_app/immutable/assets/15.D8-PX_gG.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=15-DnbkWZCJ.js.map
