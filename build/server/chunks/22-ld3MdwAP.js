import { d as db, a as admin, e as eq, g as guard, u as user, o as otp, k as desc } from './index3-DfwD5jMB.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import { v4 } from 'uuid';
import { e as encodeHexLowerCase, s as sha256 } from './hex-C-thOhOU.js';
import './base64-EEv6AAhc.js';
import { g as generateSessionToken, c as createSession, a as setSessionTokenCookie } from './auth-Be8Jj8Sg.js';
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
      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, found.id);
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
      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, found.id);
      setSessionTokenCookie(event, sessionToken, session.expiresAt);
      const redirectUrl = userRole === "admin" ? "/admin/dashboard" : userRole === "guard" ? "/guard/dashboard" : userRole === "resident" ? "/user/dashboard" : "/";
      throw redirect(303, redirectUrl);
    }
  }
};
const load = async () => {
  return {};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 22;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-9DTDXw41.js')).default;
const server_id = "src/routes/login/+page.server.ts";
const imports = ["_app/immutable/nodes/22.ClBXmv4b.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/G6y-YXti.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/CYxAlzJ1.js","_app/immutable/chunks/BdvQLAZU.js","_app/immutable/chunks/BfIrQ_zr.js","_app/immutable/chunks/Cko499XQ.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/B96hbFDY.js","_app/immutable/chunks/DYNUYRjK.js","_app/immutable/chunks/DDKRNP9O.js"];
const stylesheets = ["_app/immutable/assets/22.FR_Euwfd.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=22-ld3MdwAP.js.map
