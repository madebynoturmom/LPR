import { d as db, u as user, e as eq } from './index3-CPj-fGVF.js';
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

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DgXxAuqx.js')).default;
const server_id = "src/routes/admin/dashboard/residents/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/16.Bl1NliFI.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/BBnkIoAR.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js","_app/immutable/chunks/BSK96_y8.js","_app/immutable/chunks/BaSLTKbU.js","_app/immutable/chunks/CsTGPyzP.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=16-DrvPtsx4.js.map
