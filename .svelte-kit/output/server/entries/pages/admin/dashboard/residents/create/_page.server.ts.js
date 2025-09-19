import { fail, redirect } from "@sveltejs/kit";
import { d as db, u as user } from "../../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
import { randomBytes, scryptSync } from "crypto";
import nodemailer from "nodemailer";
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
export {
  actions
};
