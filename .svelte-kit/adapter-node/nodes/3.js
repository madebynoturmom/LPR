import * as server from '../entries/pages/user/dashboard/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/user/dashboard/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/user/dashboard/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.jM4ExwW6.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/DQGvmDc0.js","_app/immutable/chunks/CrPu_4lx.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/DZss8mLC.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js","_app/immutable/chunks/BIKuTJgm.js","_app/immutable/chunks/DioV78hU.js","_app/immutable/chunks/-kgmExda.js","_app/immutable/chunks/Cdivgpra.js","_app/immutable/chunks/DC2F6t9P.js"];
export const stylesheets = ["_app/immutable/assets/3.B3jJJPDi.css"];
export const fonts = [];
