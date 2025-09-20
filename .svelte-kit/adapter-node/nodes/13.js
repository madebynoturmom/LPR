import * as server from '../entries/pages/admin/dashboard/residents/_id_/_page.server.ts.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/residents/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/residents/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/13.C5GTs6hl.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/D6O3RN6I.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/DSozhXEh.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js","_app/immutable/chunks/ZMIOfXK-.js","_app/immutable/chunks/DQtEjgo4.js","_app/immutable/chunks/C26tcRC5.js"];
export const stylesheets = ["_app/immutable/assets/13.CDIXWxuu.css"];
export const fonts = [];
