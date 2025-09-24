import { c as ensure_array_like, f as bind_props } from './index2-CW9yIE9Z.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { b as attr } from './attributes-Y1rI5qy_.js';
import './context-BatlNbRu.js';
import './utils2-JZdwKo0Y.js';

function _page($$renderer, $$props) {
  let data = $$props["data"];
  let { vehicles } = data;
  $$renderer.push(`<div class="vehicle-page-container svelte-y9yr8f"><a href="/user/dashboard" class="back-btn svelte-y9yr8f">← Back to Dashboard</a> <h2>Your Vehicles</h2> <a href="/user/dashboard/vehicles/create" class="add-btn svelte-y9yr8f">+ Add Vehicle</a> `);
  if (vehicles.length === 0) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<p>No vehicles found for your account.</p>`);
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<ul class="vehicle-list svelte-y9yr8f"><!--[-->`);
    const each_array = ensure_array_like(vehicles);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let v = each_array[$$index];
      $$renderer.push(`<li class="svelte-y9yr8f"><strong>Plate: ${escape_html(v.plateNumber)}</strong><br/> `);
      if (v.accessTime) {
        $$renderer.push("<!--[-->");
        $$renderer.push(`Last Access: ${escape_html(v.accessTime)}<br/>`);
      } else {
        $$renderer.push("<!--[!-->");
      }
      $$renderer.push(`<!--]--> <a${attr("href", `/user/dashboard/vehicles/${v.id}/edit`)} class="edit-link svelte-y9yr8f">Edit</a> <a${attr("href", `/user/dashboard/vehicles/${v.id}/delete`)} class="delete-link svelte-y9yr8f">Delete</a></li>`);
    }
    $$renderer.push(`<!--]--></ul>`);
  }
  $$renderer.push(`<!--]--></div>`);
  bind_props($$props, { data });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DOVlQPY-.js.map
