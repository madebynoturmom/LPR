import * as server from '../entries/pages/admin/dashboard/events/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/events/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/events/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.CWZBrYYw.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/BdvQLAZU.js","_app/immutable/chunks/g0qwyJPX.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/BWorSmfV.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js"];
export const stylesheets = ["_app/immutable/assets/9.DFhwXHc2.css"];
export const fonts = [];
