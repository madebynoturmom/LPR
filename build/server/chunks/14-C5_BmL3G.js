import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import { d as db, u as user, e as eq } from './index3-DE5iFVeB.js';
import { randomBytes, scryptSync } from 'crypto';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import 'better-sqlite3';

nodemailer.createTransport({
  service: "gmail",
  // or another provider
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const carNumber = form.get("carNumber")?.toString().trim();
    const houseNumber = form.get("houseNumber")?.toString().trim();
    if (!name || !email || !phone || !carNumber || !houseNumber) {
      return fail(400, { error: "All fields are required." });
    }
    const username = email;
    const residents = await db.select().from(user).where(eq(user.role, "resident"));
    const maxNum = residents.map((r) => typeof r.id === "string" && r.id.startsWith("R") ? parseInt(r.id.slice(1), 10) : 0).reduce((max, n) => n > max ? n : max, 0);
    const nextNum = maxNum + 1;
    const id = `R${nextNum.toString().padStart(3, "0")}`;
    const plainPassword = randomBytes(6).toString("base64").replace(/[^a-zA-Z0-9]/g, "").slice(0, 10);
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(plainPassword, salt, 64).toString("hex");
    const passwordHash = `${salt}:${hash}`;
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
        houseNumber
      });
      throw redirect(303, "/admin/dashboard/residents");
    } catch (e) {
      return fail(500, { error: "Failed to create resident." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 14;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BNBPscRF.js')).default;
const server_id = "src/routes/admin/dashboard/residents/create/+page.server.ts";
const imports = ["_app/immutable/nodes/14.CI2YeUrd.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/CE_Elu-f.js"];
const stylesheets = ["_app/immutable/assets/14.o_R4P_hM.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=14-C5_BmL3G.js.map
