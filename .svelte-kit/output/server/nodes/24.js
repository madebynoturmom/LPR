import * as server from '../entries/pages/user/dashboard/_page.server.ts.js';

export const index = 24;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/user/dashboard/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/user/dashboard/+page.server.ts";
export const imports = ["_app/immutable/nodes/24.D1SgSZGl.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/BdvQLAZU.js","_app/immutable/chunks/g0qwyJPX.js","_app/immutable/chunks/BfIrQ_zr.js","_app/immutable/chunks/BkOMJDxY.js","_app/immutable/chunks/CdEA5IGF.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/BWorSmfV.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js","_app/immutable/chunks/CMcci-F-.js","_app/immutable/chunks/B96hbFDY.js","_app/immutable/chunks/G6y-YXti.js","_app/immutable/chunks/CYxAlzJ1.js","_app/immutable/chunks/DYNUYRjK.js"];
export const stylesheets = ["_app/immutable/assets/24.m9s_vsEn.css"];
export const fonts = [];
