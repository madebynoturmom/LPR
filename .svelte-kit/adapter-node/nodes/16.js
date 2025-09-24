import * as server from '../entries/pages/admin/dashboard/residents/_id_/_page.server.ts.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/residents/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/residents/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/16.Bl1NliFI.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/BBnkIoAR.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js","_app/immutable/chunks/BSK96_y8.js","_app/immutable/chunks/BaSLTKbU.js","_app/immutable/chunks/CsTGPyzP.js"];
export const stylesheets = [];
export const fonts = [];
