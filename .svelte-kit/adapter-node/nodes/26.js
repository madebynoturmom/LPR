import * as server from '../entries/pages/user/dashboard/history/_page.server.ts.js';

export const index = 26;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/user/dashboard/history/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/user/dashboard/history/+page.server.ts";
export const imports = ["_app/immutable/nodes/26.C0-mlF-k.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/D6O3RN6I.js","_app/immutable/chunks/DMSwwT4m.js","_app/immutable/chunks/CAznQZM0.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/DSozhXEh.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js"];
export const stylesheets = ["_app/immutable/assets/26.BRUEHXMY.css"];
export const fonts = [];
