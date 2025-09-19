import * as server from '../entries/pages/admin/dashboard/settings/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/settings/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/settings/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.ByPdFLtY.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/DJtz8HCy.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CmkkP05h.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/Cpx9Zc3b.js","_app/immutable/chunks/D4Caz1gY.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js","_app/immutable/chunks/C5ccUtUr.js","_app/immutable/chunks/DfxkLT-v.js","_app/immutable/chunks/BqEnfvlG.js"];
export const stylesheets = ["_app/immutable/assets/15.DSsgAKWg.css"];
export const fonts = [];
