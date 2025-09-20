import { fail, redirect } from "@sveltejs/kit";
import { d as db, u as user } from "../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
const load = async () => {
  const residents = await db.select().from(user).where(eq(user.role, "resident"));
  return { residents };
};
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
      throw redirect(303, "/admin/dashboard/residents");
    } catch (e) {
      return fail(500, { error: "Failed to create resident." });
    }
  }
};
export {
  actions,
  load
};
