import { _ as bind_props } from './index2-yPxTiqcs.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './attributes-BdjbuRwA.js';
import './utils2-JZdwKo0Y.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  let data = $$props["data"];
  let { vehicle } = data;
  $$renderer.push(`<h2>Delete Vehicle</h2> <p>Are you sure you want to delete this vehicle?</p> <ul><li><strong>${escape_html(vehicle.model)}</strong> (${escape_html(vehicle.makeYear)})</li> <li>Plate: ${escape_html(vehicle.plateNumber)}</li></ul> <button class="delete-btn svelte-1s615an">Delete</button> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
  bind_props($$props, { data });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-IBF1K43s.js.map
