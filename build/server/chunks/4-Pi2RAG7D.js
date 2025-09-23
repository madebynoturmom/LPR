import { d as db, u as user, e as eq } from './index3-CPj-fGVF.js';
import { r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async ({ locals }) => {
  const user$1 = locals.user;
  if (!user$1) throw redirect(303, "/login");
  const users = await db.select().from(user).where(eq(user.id, user$1.id));
  if (!users.length) throw redirect(303, "/login");
  const userData = users[0];
  console.log("Layout load - user data:", userData);
  console.log("Layout load - profile pic:", userData.profilePic);
  return { user: userData };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-f2K1ZcdY.js')).default;
const server_id = "src/routes/user/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/4.1TF9K_nY.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/BQQlMUYl.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/D5ruwRzR.js","_app/immutable/chunks/D3LgcHxc.js","_app/immutable/chunks/EO6i301i.js","_app/immutable/chunks/STPvjbMu.js","_app/immutable/chunks/DbZgNqix.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js","_app/immutable/chunks/CprSpIeg.js","_app/immutable/chunks/CK-fib3O.js","_app/immutable/chunks/tN8zdOQx.js"];
const stylesheets = ["_app/immutable/assets/4.3aK3_JQn.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-Pi2RAG7D.js.map
