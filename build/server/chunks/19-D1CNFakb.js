import { r as redirect, f as fail } from './index-BmA2ZghE.js';
import { d as db, a as admin, e as eq } from './index3-CPj-fGVF.js';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import 'better-sqlite3';

const DEFAULT_SETTINGS = {
  general: {
    siteTitle: "My App",
    enableRegistration: true,
    defaultLocale: "en"
  },
  integrations: {
    sendgridApiKey: null,
    slackWebhook: null
  },
  appearance: {
    theme: "system",
    showAvatars: true
  }
};
const SETTINGS_PATH = path.resolve("db/settings.json");
function loadSettings() {
  try {
    if (!fs.existsSync(SETTINGS_PATH)) {
      saveSettings(DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }
    const raw = fs.readFileSync(SETTINGS_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch (err) {
    console.error("Failed to load settings, falling back to defaults", err);
    return DEFAULT_SETTINGS;
  }
}
function saveSettings(settings) {
  const dir = path.dirname(SETTINGS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8");
}
const load = async ({ locals }) => {
  const user = locals.user;
  if (!user) throw redirect(302, "/login");
  if (user.role !== "admin") throw redirect(302, "/");
  const [adminRow] = await db.select().from(admin).where(eq(admin.id, user.id));
  const appSettings = loadSettings();
  return { user: adminRow, settings: appSettings };
};
const actions = {
  default: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) throw redirect(302, "/login");
    if (user.role !== "admin") throw redirect(302, "/");
    const form = await request.formData();
    const name = form.get("name");
    const email = form.get("email");
    const username = form.get("username");
    const password = form.get("password");
    let profilePic = void 0;
    const file = form.get("profilePicture");
    if (file && file.size > 0) {
      const uploadDir = path.resolve("static/uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const fileName = `admin_${user.id}_${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      profilePic = `/uploads/${fileName}`;
    }
    const updateData = { name, email, username };
    if (profilePic) updateData.profilePic = profilePic;
    if (password && password.length > 0) {
      updateData.passwordHash = crypto.createHash("sha256").update(password).digest("hex");
    }
    await db.update(admin).set(updateData).where(eq(admin.id, user.id));
    return { success: true };
  },
  save: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) throw redirect(302, "/login");
    if (user.role !== "admin") throw redirect(302, "/");
    const form = await request.formData();
    const general_siteTitle = form.get("general.siteTitle")?.toString() ?? DEFAULT_SETTINGS.general.siteTitle;
    const general_enableRegistration = form.get("general.enableRegistration") !== null;
    const general_defaultLocale = form.get("general.defaultLocale")?.toString() ?? DEFAULT_SETTINGS.general.defaultLocale;
    const appearance_theme = form.get("appearance.theme")?.toString() || DEFAULT_SETTINGS.appearance.theme;
    const appearance_showAvatars = form.get("appearance.showAvatars") !== null;
    const integrations_sendgrid = form.get("integrations.sendgridApiKey")?.toString() || null;
    const integrations_slack = form.get("integrations.slackWebhook")?.toString() || null;
    const newSettings = {
      general: {
        siteTitle: general_siteTitle,
        enableRegistration: !!general_enableRegistration,
        defaultLocale: general_defaultLocale
      },
      integrations: {
        sendgridApiKey: integrations_sendgrid || null,
        slackWebhook: integrations_slack || null
      },
      appearance: {
        theme: appearance_theme || DEFAULT_SETTINGS.appearance.theme,
        showAvatars: !!appearance_showAvatars
      }
    };
    try {
      saveSettings(newSettings);
      return { success: true };
    } catch (err) {
      console.error("Failed to save settings", err);
      return fail(500, { error: "Failed to save settings" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 19;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bq-cBmtD.js')).default;
const server_id = "src/routes/admin/dashboard/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/19.D2CteY74.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js","_app/immutable/chunks/DDCxn3ry.js","_app/immutable/chunks/WNbVgFxQ.js","_app/immutable/chunks/BaSLTKbU.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/CsTGPyzP.js","_app/immutable/chunks/BSK96_y8.js"];
const stylesheets = ["_app/immutable/assets/19.Dw4ZzkHd.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=19-D1CNFakb.js.map
