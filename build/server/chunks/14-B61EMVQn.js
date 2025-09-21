import { d as db, u as user, e as eq } from './index3-DfwD5jMB.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async ({ params }) => {
  const id = params.id;
  const resident = await db.select().from(user).where(eq(user.id, id)).then((rows) => rows[0]);
  return { resident };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 14;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DSqZkVc3.js')).default;
const server_id = "src/routes/admin/dashboard/residents/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/14.D-V6pJE5.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/BdvQLAZU.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/BWorSmfV.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js","_app/immutable/chunks/EP93BFIp.js","_app/immutable/chunks/G6y-YXti.js","_app/immutable/chunks/CYxAlzJ1.js"];
const stylesheets = ["_app/immutable/assets/14.CDIXWxuu.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=14-B61EMVQn.js.map
