import * as server from '../entries/pages/user/dashboard/vehicles/_id_/edit/_page.server.ts.js';

export const index = 30;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/user/dashboard/vehicles/_id_/edit/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/user/dashboard/vehicles/[id]/edit/+page.server.ts";
export const imports = ["_app/immutable/nodes/30.D6ksBlWB.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/CBdOqptF.js","_app/immutable/chunks/D4Caz1gY.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
export const stylesheets = ["_app/immutable/assets/30.BXnW_C-f.css"];
export const fonts = [];
