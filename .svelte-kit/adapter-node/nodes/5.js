import * as server from '../entries/pages/admin/dashboard/admins/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/admins/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/admins/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.Dk79XB6L.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/DLge_FqR.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/BSmjIgV1.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js"];
export const stylesheets = ["_app/immutable/assets/5.MIloi5yZ.css"];
export const fonts = [];
