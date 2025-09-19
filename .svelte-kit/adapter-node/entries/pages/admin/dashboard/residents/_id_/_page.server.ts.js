import { d as db, u as user } from "../../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
const load = async ({ params }) => {
  const id = params.id;
  const resident = await db.select().from(user).where(eq(user.id, id)).then((rows) => rows[0]);
  return { resident };
};
export {
  load
};
