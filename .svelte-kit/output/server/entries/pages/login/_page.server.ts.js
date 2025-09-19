import { d as db, b as admin, u as user, s as session } from "../../../chunks/index3.js";
import { fail, redirect } from "@sveltejs/kit";
import { v4 } from "uuid";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { eq } from "drizzle-orm";
import crypto from "crypto";
const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const username = form.get("username")?.toString().trim();
    const password = form.get("password")?.toString();
    if (!username || !password) {
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
      return fail(401, { error: "Invalid username or password." });
    }
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    if (hash !== found.passwordHash) {
      return fail(401, { error: "Invalid username or password." });
    }
    const sessionToken = v4();
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
    const expiresAt = new Date(Date.now() + 1e3 * 60 * 60 * 24 * 7);
    await db.insert(session).values({
      id: sessionId,
      userId: found.id,
      expiresAt
    });
    cookies.set("auth-session", sessionToken, { path: "/", httpOnly: true });
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
