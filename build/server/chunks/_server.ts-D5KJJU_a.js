import { d as db, u as user, e as eq } from './index3-DfwD5jMB.js';
import { j as json } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

async function POST({ params }) {
  const id = params.id;
  if (!id) {
    return json({ success: false, error: "Missing resident id" }, { status: 400 });
  }
  await db.delete(user).where(eq(user.id, id));
  return json({ success: true });
}

export { POST };
//# sourceMappingURL=_server.ts-D5KJJU_a.js.map
