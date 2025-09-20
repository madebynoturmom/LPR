import { d as db, c as eventLog, u as user } from './index3-DTrFeyBm.js';
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

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BY0Stqqq.js')).default;
const server_id = "src/routes/admin/dashboard/events/+page.server.ts";
const imports = ["_app/immutable/nodes/8.K9sNCidU.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/D6O3RN6I.js","_app/immutable/chunks/DMSwwT4m.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/DSozhXEh.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js"];
const stylesheets = ["_app/immutable/assets/8.DFhwXHc2.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-CHTMGDbq.js.map
