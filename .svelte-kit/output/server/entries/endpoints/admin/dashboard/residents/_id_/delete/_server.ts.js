import { d as db, u as user } from "../../../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
import { json } from "@sveltejs/kit";
async function POST({ params }) {
  const id = params.id;
  if (!id) {
    return json({ success: false, error: "Missing resident id" }, { status: 400 });
  }
  await db.delete(user).where(eq(user.id, id));
  return json({ success: true });
}
export {
  POST
};
