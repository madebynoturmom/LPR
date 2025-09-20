import * as server from '../entries/pages/admin/dashboard/guards/create/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/guards/create/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/guards/create/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.BXkeCB8g.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/tQRZQKdW.js"];
export const stylesheets = ["_app/immutable/assets/10.B5cHOmNV.css"];
export const fonts = [];
