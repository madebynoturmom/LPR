import * as server from '../entries/pages/user/dashboard/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/user/dashboard/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/user/dashboard/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.ucflpvdO.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DQtEjgo4.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/C26tcRC5.js","_app/immutable/chunks/DMSwwT4m.js","_app/immutable/chunks/F_QpQINx.js","_app/immutable/chunks/DWyjkCdo.js","_app/immutable/chunks/CAznQZM0.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js","_app/immutable/chunks/BztOMDdA.js","_app/immutable/chunks/Bz7ZLckS.js","_app/immutable/chunks/ZMIOfXK-.js"];
export const stylesheets = ["_app/immutable/assets/3.3aK3_JQn.css"];
export const fonts = [];
