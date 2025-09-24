import { redirect, fail } from "@sveltejs/kit";
import { d as db, a as admin } from "../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import fs from "fs";
import path from "path";
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
export {
  actions,
  load
};
