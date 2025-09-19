import * as server from '../entries/pages/admin/dashboard/residents/_page.server.ts.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/residents/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/residents/+page.server.ts";
export const imports = ["_app/immutable/nodes/11.BA5XMrPd.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/DLge_FqR.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/D4Caz1gY.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/BSmjIgV1.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js"];
export const stylesheets = ["_app/immutable/assets/11.CdzZ43dc.css"];
export const fonts = [];
