import * as server from '../entries/pages/admin/dashboard/guards/create/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/guards/create/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/guards/create/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.CnyWgcPm.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/D6O3RN6I.js"];
export const stylesheets = ["_app/immutable/assets/10.lUCd4BbX.css"];
export const fonts = [];
