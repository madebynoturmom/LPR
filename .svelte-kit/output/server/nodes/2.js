import * as server from '../entries/pages/admin/dashboard/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.DFv6uTcC.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/g0qwyJPX.js","_app/immutable/chunks/DPwYzefT.js","_app/immutable/chunks/BfIrQ_zr.js","_app/immutable/chunks/C80BVqqJ.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js","_app/immutable/chunks/74iUYhy1.js","_app/immutable/chunks/CrdiqAgI.js","_app/immutable/chunks/G6y-YXti.js","_app/immutable/chunks/CYxAlzJ1.js","_app/immutable/chunks/BvzuUZFe.js"];
export const stylesheets = ["_app/immutable/assets/2.w0BPJsK9.css"];
export const fonts = [];
