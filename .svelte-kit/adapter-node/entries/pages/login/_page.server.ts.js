import { d as db, b as admin, u as user } from "../../../chunks/index3.js";
import { fail, redirect } from "@sveltejs/kit";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { eq } from "drizzle-orm";
import { g as generateSessionToken, c as createSession, s as setSessionTokenCookie } from "../../../chunks/auth.js";
const actions = {
  default: async (event) => {
    const { request, cookies } = event;
    const form = await request.formData();
    const username = form.get("username")?.toString().trim();
    const password = form.get("password")?.toString();
    if (!username || !password) {
      console.error("Login failed: Missing username or password");
      return fail(400, { error: "Username and password are required." });
    }
    let found = null;
    let userRole = null;
    const admins = await db.select().from(admin).where(eq(admin.username, username));
    if (admins.length > 0) {
      found = admins[0];
      userRole = "admin";
    } else {
      const users = await db.select().from(user).where(eq(user.username, username));
      if (users.length > 0) {
        found = users[0];
        userRole = found.role;
      }
    }
    if (!found) {
      console.error("Login failed: Invalid username");
      return fail(401, { error: "Invalid username or password." });
    }
    const hash = encodeHexLowerCase(sha256(new TextEncoder().encode(password)));
    if (hash !== found.passwordHash) {
      console.error("Login failed: Invalid password");
      return fail(401, { error: "Invalid username or password." });
    }
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, found.id);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
    if (userRole === "admin") {
      throw redirect(303, "/admin/dashboard");
    } else if (userRole === "guard") {
      throw redirect(303, "/guard/dashboard");
    } else if (userRole === "resident") {
      throw redirect(303, "/user/dashboard");
    } else {
      throw redirect(303, "/");
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
