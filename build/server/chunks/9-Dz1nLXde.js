import { d as db, c as eventLog, u as user } from './index3-DfwD5jMB.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async () => {
  const eventsRaw = await db.select().from(eventLog).all();
  const users = await db.select().from(user).all();
  const userMap = Object.fromEntries(users.map((u) => [u.id, u]));
  const events = eventsRaw.map((e) => {
    const ts = typeof e.timestamp === "string" ? parseInt(e.timestamp, 10) : e.timestamp;
    return {
      ...e,
      userName: e.userId ? userMap[e.userId]?.name || userMap[e.userId]?.username || "-" : "System",
      time: new Date(Number(ts) * 1e3).toLocaleString()
    };
  });
  return { events };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BY0Stqqq.js')).default;
const server_id = "src/routes/admin/dashboard/events/+page.server.ts";
const imports = ["_app/immutable/nodes/9.CWZBrYYw.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/BdvQLAZU.js","_app/immutable/chunks/g0qwyJPX.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/BWorSmfV.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js"];
const stylesheets = ["_app/immutable/assets/9.DFhwXHc2.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-Dz1nLXde.js.map
