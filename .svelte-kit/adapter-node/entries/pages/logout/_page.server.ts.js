import { redirect } from "@sveltejs/kit";
import { d as db, s as session } from "../../../chunks/index3.js";
import { eq } from "drizzle-orm";
import "@oslojs/encoding";
import "@oslojs/crypto/sha2";
const actions = {
  default: async (event) => {
    const sessionToken = event.cookies.get("auth-session");
    if (sessionToken) {
      await db.delete(session).where(eq(session.id, sessionToken));
      event.cookies.delete("auth-session", { path: "/" });
    }
    throw redirect(303, "/login");
  }
};
export {
  actions
};
