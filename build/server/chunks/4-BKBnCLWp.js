import { d as db, u as user, e as eq } from './index3-DfwD5jMB.js';
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
const component = async () => component_cache ??= (await import('./_layout.svelte-oXCUxSoF.js')).default;
const server_id = "src/routes/user/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/4.TcN5vhzo.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/G6y-YXti.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/CYxAlzJ1.js","_app/immutable/chunks/g0qwyJPX.js","_app/immutable/chunks/DPwYzefT.js","_app/immutable/chunks/BfIrQ_zr.js","_app/immutable/chunks/C80BVqqJ.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js","_app/immutable/chunks/DTIvn4B3.js","_app/immutable/chunks/DNr0OUhH.js","_app/immutable/chunks/D27ElQeU.js"];
const stylesheets = ["_app/immutable/assets/4.3aK3_JQn.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-BKBnCLWp.js.map
