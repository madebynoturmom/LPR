import { X as ensure_array_like, _ as bind_props } from "../../../../../chunks/index2.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import { a as attr } from "../../../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let residents = data?.residents ?? [];
    $$renderer2.push(`<section class="admin-section svelte-130yy4t"><button type="button" class="back-btn svelte-130yy4t">← Back</button> <h2>Manage Residents</h2> <a href="/admin/dashboard/residents/create" class="add-resident-btn small-blue svelte-130yy4t">+ Add Resident</a> <h3>Residents List</h3> <table class="resident-table svelte-130yy4t"><thead><tr><th class="svelte-130yy4t">Name</th><th class="svelte-130yy4t">Email</th><th class="svelte-130yy4t">Phone</th><th class="svelte-130yy4t">Car Number</th><th class="svelte-130yy4t">House Number</th><th class="svelte-130yy4t">Actions</th></tr></thead><tbody><!--[-->`);
    const each_array = ensure_array_like(residents);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let resident = each_array[$$index];
      $$renderer2.push(`<tr><td class="svelte-130yy4t">${escape_html(resident.name)}</td><td class="svelte-130yy4t">${escape_html(resident.email)}</td><td class="svelte-130yy4t">${escape_html(resident.phone)}</td><td class="svelte-130yy4t">${escape_html(resident.carNumber)}</td><td class="svelte-130yy4t">${escape_html(resident.houseAddress)}</td><td class="svelte-130yy4t"><a${attr("href", `/admin/dashboard/residents/${resident.id}/edit`)} class="edit-btn svelte-130yy4t">Edit</a> <form method="POST" style="display:inline"><button type="submit" class="delete-btn svelte-130yy4t">Delete</button></form></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></section>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
