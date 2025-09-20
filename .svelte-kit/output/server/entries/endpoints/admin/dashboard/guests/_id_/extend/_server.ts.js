import { d as db, g as guestPass } from "../../../../../../../chunks/index3.js";
import { eq } from "drizzle-orm/sql/expressions/conditions";
const POST = async ({ request, params }) => {
  const id = params.id;
  const form = await request.formData();
  const minutes = Number(form.get("minutes")) || Number(form.get("minutes")) === 0 ? Number(form.get("minutes")) : null;
  if (!id || !minutes || minutes <= 0) {
    return new Response(JSON.stringify({ error: "Missing id or invalid minutes" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
  const existing = await db.select().from(guestPass).where(eq(guestPass.id, id)).get();
  if (!existing) {
    return new Response(JSON.stringify({ error: "Pass not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
  }
  const current = Number(existing.durationMinutes) || 0;
  const newDuration = current + Number(minutes);
  await db.update(guestPass).set({ durationMinutes: newDuration }).where(eq(guestPass.id, id));
  const updated = { ...existing, durationMinutes: newDuration };
  return new Response(JSON.stringify({ pass: updated }), { status: 200, headers: { "Content-Type": "application/json" } });
};
export {
  POST
};
