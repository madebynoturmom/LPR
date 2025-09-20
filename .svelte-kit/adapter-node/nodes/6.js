import * as server from '../entries/pages/admin/dashboard/admins/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/admins/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/admins/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.BX2OrApR.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DQtEjgo4.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/C26tcRC5.js","_app/immutable/chunks/D6O3RN6I.js","_app/immutable/chunks/DMSwwT4m.js","_app/immutable/chunks/DWyjkCdo.js","_app/immutable/chunks/CAznQZM0.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/ZHN8wxDx.js","_app/immutable/chunks/Btu2CQ7A.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/DSozhXEh.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js"];
export const stylesheets = ["_app/immutable/assets/6.DMSCsXDq.css"];
export const fonts = [];
