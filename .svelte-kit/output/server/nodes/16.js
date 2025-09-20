import * as server from '../entries/pages/admin/dashboard/settings/_page.server.ts.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/settings/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/settings/+page.server.ts";
export const imports = ["_app/immutable/nodes/16.Bqisgl-y.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DQtEjgo4.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/C26tcRC5.js","_app/immutable/chunks/D6O3RN6I.js","_app/immutable/chunks/DWyjkCdo.js","_app/immutable/chunks/Btu2CQ7A.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js","_app/immutable/chunks/BztOMDdA.js","_app/immutable/chunks/Bz7ZLckS.js","_app/immutable/chunks/ZMIOfXK-.js"];
export const stylesheets = ["_app/immutable/assets/16.EWDonvfx.css"];
export const fonts = [];
