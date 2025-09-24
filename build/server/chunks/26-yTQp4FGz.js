import { d as db, a as admin, e as eq, g as guard, u as user, o as otp, k as desc } from './index3-CPj-fGVF.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import { v4 } from 'uuid';
import { e as encodeHexLowerCase, s as sha256 } from './hex-C-thOhOU.js';
import './base64-EEv6AAhc.js';
import { g as generateSessionToken, c as createSession, a as setSessionTokenCookie, D as DAY_IN_MS } from './auth-D-K-3g0d.js';
import { s as sendEmail } from './email-REl8RnBL.js';
import 'dotenv/config';
import 'better-sqlite3';
import 'nodemailer';

const actions = {
  default: async (event) => {
    console.log("🔐 Login Action: Starting");
    const { request } = event;
    const form = await request.formData();
    const username = form.get("username")?.toString().trim();
    const otpCode = form.get("otp")?.toString().trim();
    console.log("🔐 Received form data: username=", username, "otpCode=", otpCode ? "provided" : "not provided");
    if (!username) {
      return fail(400, { error: "Username is required." });
    }
    const usernameLower = username.toLowerCase();
    let found = null;
    let userRole = null;
    let userEmail = null;
    const admins = await db.select().from(admin).where(eq(admin.username, usernameLower));
    if (admins.length > 0) {
      found = admins[0];
      userRole = "admin";
      userEmail = found.email;
    } else {
      const guards = await db.select().from(guard).where(eq(guard.username, usernameLower));
      if (guards.length > 0) {
        found = guards[0];
        userRole = "guard";
        userEmail = null;
      } else {
        const users = await db.select().from(user).where(eq(user.username, usernameLower));
        if (users.length > 0) {
          found = users[0];
          userRole = found.role;
          userEmail = found.email;
        }
      }
    }
    if (!found) {
      console.log("🔐 User not found for username:", username);
      return fail(401, { error: "Invalid username." });
    }
    if (userRole !== "guard" && !userEmail) {
      console.log("🔐 No email associated with user:", username);
      return fail(400, { error: "No email associated with this user." });
    }
    console.log("🔐 User found:", usernameLower, "Role:", userRole, "Email:", userEmail);
    if (userRole === "guard") {
      const password = form.get("password")?.toString();
      if (!password) {
        return fail(400, { error: "Password is required for guard login." });
      }
      const providedHash = encodeHexLowerCase(sha256(new TextEncoder().encode(password)));
      if (!found.passwordHash || providedHash !== found.passwordHash) {
        console.log("🔐 Guard password mismatch for user:", username);
        return fail(401, { error: "Invalid password." });
      }
      const rememberFlag = form.get("remember")?.toString() === "1";
      const ttlMs = rememberFlag ? DAY_IN_MS * 30 : 1e3 * 60 * 60 * 8;
      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, found.id, ttlMs);
      setSessionTokenCookie(event, sessionToken, session.expiresAt);
      const redirectUrl = "/guard/dashboard";
      const accept = request.headers.get("accept") || "";
      if (accept.includes("application/json")) return { success: true, redirect: redirectUrl };
      throw redirect(303, redirectUrl);
    }
    if (!otpCode) {
      const targetEmail = userEmail;
      if (!targetEmail) {
        console.log("🔐 No email available for OTP flow (unexpected)");
        return fail(500, { error: "No email for OTP flow." });
      }
      console.log("🔐 OTP Generation: Starting for username:", username);
      const code = Math.floor(1e5 + Math.random() * 9e5).toString();
      console.log("🔐 OTP Generated:", code, "for email:", targetEmail);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1e3);
      console.log("🔐 OTP Expires At:", expiresAt);
      await db.insert(otp).values({
        id: v4(),
        email: targetEmail,
        code,
        expiresAt
      });
      console.log("🔐 OTP Stored in DB");
      console.log("📧 SMTP_USER set:", !!process.env.SMTP_USER);
      console.log("📧 SMTP_PASS set:", !!process.env.SMTP_PASS);
      console.log("📧 Sending OTP email to:", targetEmail);
      try {
        await sendEmail(targetEmail, "Your OTP Code", `Your OTP code is: ${code}`);
        console.log("📧 OTP Email sent successfully");
      } catch (emailError) {
        console.error("📧 OTP Email send failed:", emailError);
        return fail(500, { error: "Failed to send OTP email. Please try again." });
      }
      const body = { otpSent: true, message: "OTP sent to your email." };
      console.log("🔐 Sending back response (action):", body);
      return body;
    } else {
      console.log("🔐 OTP Verification: Starting for email:", userEmail, "OTP:", otpCode);
      const targetEmail = userEmail;
      if (!targetEmail) {
        console.log("🔐 No email available for OTP verification (unexpected)");
        return fail(500, { error: "No email for OTP verification." });
      }
      const otpRecords = await db.select().from(otp).where(eq(otp.email, targetEmail)).orderBy(desc(otp.expiresAt));
      console.log("🔐 OTP Records found:", otpRecords.length);
      if (otpRecords.length === 0) {
        console.log("🔐 No OTP records found for email:", userEmail);
        return fail(401, { error: "No OTP found. Please request a new one." });
      }
      const latestOtp = otpRecords[0];
      console.log("🔐 Latest OTP:", latestOtp.code, "Expires:", latestOtp.expiresAt);
      const otpExpiresAt = typeof latestOtp.expiresAt === "number" ? latestOtp.expiresAt : new Date(latestOtp.expiresAt).getTime();
      if (Date.now() > otpExpiresAt) {
        console.log("🔐 OTP expired");
        return fail(401, { error: "OTP expired. Please request a new one." });
      }
      if (latestOtp.code !== otpCode) {
        console.log("🔐 OTP mismatch: provided", otpCode, "stored", latestOtp.code);
        return fail(401, { error: "Invalid OTP." });
      }
      console.log("🔐 OTP verified successfully");
      await db.delete(otp).where(eq(otp.id, latestOtp.id));
      console.log("🔐 OTP deleted from DB");
      const rememberFlag = form.get("remember")?.toString() === "1";
      const ttlMs = rememberFlag ? DAY_IN_MS * 30 : 1e3 * 60 * 60 * 8;
      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, found.id, ttlMs);
      setSessionTokenCookie(event, sessionToken, session.expiresAt);
      const redirectUrl = userRole === "admin" ? "/admin/dashboard" : userRole === "guard" ? "/guard/dashboard" : userRole === "resident" ? "/user/dashboard" : "/";
      return { success: true, redirect: redirectUrl };
    }
  }
};
const load = async ({ locals }) => {
  const user2 = locals.user;
  if (user2) {
    const redirectUrl = user2.role === "admin" ? "/admin/dashboard" : user2.role === "guard" ? "/guard/dashboard" : user2.role === "resident" ? "/user/dashboard" : "/";
    throw redirect(303, redirectUrl);
  }
  return {};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 26;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-FOKRmf2a.js')).default;
const server_id = "src/routes/login/+page.server.ts";
const imports = ["_app/immutable/nodes/26.C26m2ANb.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/BaSLTKbU.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/CsTGPyzP.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/DCKGlpqt.js","_app/immutable/chunks/BnZ110ug.js","_app/immutable/chunks/DnwoYYiD.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/WNbVgFxQ.js","_app/immutable/chunks/BSK96_y8.js","_app/immutable/chunks/Ctr7oTW1.js","_app/immutable/chunks/Bv3Pzr92.js","_app/immutable/chunks/CyspWyKM.js","_app/immutable/chunks/Ct8xIc2f.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/BrKrArgY.js","_app/immutable/chunks/BBnkIoAR.js","_app/immutable/chunks/CkJi4ZpE.js"];
const stylesheets = ["_app/immutable/assets/Card.DyLEl-H6.css","_app/immutable/assets/26.BbxfV8j9.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=26-yTQp4FGz.js.map
