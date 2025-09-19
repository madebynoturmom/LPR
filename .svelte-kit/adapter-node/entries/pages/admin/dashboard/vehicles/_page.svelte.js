import { W as ensure_array_like, _ as bind_props } from "../../../../../chunks/index2.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import { a as attr } from "../../../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let vehicles = data?.vehicles ?? [];
    data?.users ?? [];
    $$renderer2.push(`<section class="admin-section svelte-55b735"><button type="button" class="back-btn svelte-55b735">← Back</button> <h2>Manage Vehicles</h2> <a href="/admin/dashboard/vehicles/create" class="add-vehicle-btn svelte-55b735">+ Add Vehicle</a> <h3>Vehicles List</h3> <table class="vehicle-table svelte-55b735"><thead><tr><th class="svelte-55b735">Plate Number</th><th class="svelte-55b735">Owner</th><th class="svelte-55b735">Car Model</th><th class="svelte-55b735">Make Year</th><th class="svelte-55b735">Actions</th></tr></thead><tbody><!--[-->`);
    const each_array = ensure_array_like(vehicles);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let vehicle = each_array[$$index];
      $$renderer2.push(`<tr><td class="svelte-55b735">${escape_html(vehicle.plateNumber)}</td><td class="svelte-55b735">${escape_html(vehicle.ownerName ?? "-")}</td><td class="svelte-55b735">${escape_html(vehicle.model)}</td><td class="svelte-55b735">${escape_html(vehicle.makeYear)}</td><td class="svelte-55b735"><form method="POST" action="?/delete"><input type="hidden" name="id"${attr("value", vehicle.id)}/> <button type="submit" class="btn btn-delete svelte-55b735">Delete</button></form></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></section>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
