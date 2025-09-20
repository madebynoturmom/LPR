import { d as db, u as user, e as eq } from './index3-DTrFeyBm.js';
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

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-oXCUxSoF.js')).default;
const server_id = "src/routes/user/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/3.ucflpvdO.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DQtEjgo4.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/C26tcRC5.js","_app/immutable/chunks/DMSwwT4m.js","_app/immutable/chunks/F_QpQINx.js","_app/immutable/chunks/DWyjkCdo.js","_app/immutable/chunks/CAznQZM0.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js","_app/immutable/chunks/BztOMDdA.js","_app/immutable/chunks/Bz7ZLckS.js","_app/immutable/chunks/ZMIOfXK-.js"];
const stylesheets = ["_app/immutable/assets/3.3aK3_JQn.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-ZP8Wu2er.js.map
