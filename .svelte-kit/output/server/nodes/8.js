import * as server from '../entries/pages/admin/dashboard/events/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/events/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/events/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.K9sNCidU.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/D6O3RN6I.js","_app/immutable/chunks/DMSwwT4m.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/DSozhXEh.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js"];
export const stylesheets = ["_app/immutable/assets/8.DFhwXHc2.css"];
export const fonts = [];
