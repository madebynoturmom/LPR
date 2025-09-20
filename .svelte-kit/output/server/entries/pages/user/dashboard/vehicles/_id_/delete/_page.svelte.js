import { $ as bind_props } from "../../../../../../../chunks/index2.js";
import { e as escape_html } from "../../../../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let form = $$props["form"];
    let { vehicle } = data;
    $$renderer2.push(`<h2>Delete Vehicle</h2> <p>Are you sure you want to delete this vehicle?</p> <ul><li><strong>${escape_html(vehicle.model)}</strong> (${escape_html(vehicle.makeYear)})</li> <li>Plate: ${escape_html(vehicle.plateNumber)}</li></ul> <form method="POST"><button type="submit" class="delete-btn svelte-1s615an">Delete</button></form> `);
    if (form?.success) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="success svelte-1s615an">Vehicle deleted!</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="error svelte-1s615an">${escape_html(form.error)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { data, form });
  });
}
export {
  _page as default
};
