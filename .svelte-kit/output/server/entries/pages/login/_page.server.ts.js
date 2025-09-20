import { d as db, a as admin, u as user, o as otp } from "../../../chunks/index3.js";
import { fail, redirect } from "@sveltejs/kit";
import { v4 } from "uuid";
import "@oslojs/crypto/sha2";
import "@oslojs/encoding";
import { eq, desc } from "drizzle-orm";
import { g as generateSessionToken, c as createSession, s as setSessionTokenCookie } from "../../../chunks/auth.js";
import { s as sendEmail } from "../../../chunks/email.js";
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
    let found = null;
    let userRole = null;
    let userEmail = null;
    const admins = await db.select().from(admin).where(eq(admin.username, username));
    if (admins.length > 0) {
      found = admins[0];
      userRole = "admin";
      userEmail = found.email;
    } else {
      const users = await db.select().from(user).where(eq(user.username, username));
      if (users.length > 0) {
        found = users[0];
        userRole = found.role;
        userEmail = found.email;
      }
    }
    if (!found) {
      console.log("🔐 User not found for username:", username);
      return fail(401, { error: "Invalid username." });
    }
    if (!userEmail) {
      console.log("🔐 No email associated with user:", username);
      return fail(400, { error: "No email associated with this user." });
    }
    console.log("🔐 User found:", username, "Role:", userRole, "Email:", userEmail);
    if (!otpCode) {
      console.log("🔐 OTP Generation: Starting for username:", username);
      const code = Math.floor(1e5 + Math.random() * 9e5).toString();
      console.log("🔐 OTP Generated:", code, "for email:", userEmail);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1e3);
      console.log("🔐 OTP Expires At:", expiresAt);
      await db.insert(otp).values({
        id: v4(),
        email: userEmail,
        code,
        expiresAt
      });
      console.log("🔐 OTP Stored in DB");
      console.log("📧 SMTP_USER set:", !!process.env.SMTP_USER);
      console.log("📧 SMTP_PASS set:", !!process.env.SMTP_PASS);
      console.log("📧 Sending OTP email to:", userEmail);
      try {
        await sendEmail(userEmail, "Your OTP Code", `Your OTP code is: ${code}`);
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
      const otpRecords = await db.select().from(otp).where(eq(otp.email, userEmail)).orderBy(desc(otp.expiresAt));
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
      const accept = request.headers.get("accept") || "";
      if (accept.includes("application/json")) {
        return { success: true, redirect: redirectUrl };
      }
      throw redirect(303, redirectUrl);
    }
  }
};
const load = async () => {
  return {};
};
export {
  actions,
  load
};
