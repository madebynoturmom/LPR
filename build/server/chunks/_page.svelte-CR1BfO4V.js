import { X as ensure_array_like, W as attr_class, _ as stringify, $ as bind_props } from './index2-D53USUVF.js';
import { a as attr } from './attributes-CgdCmHPy.js';
import { j as escape_html } from './escaping-CItVpVa9.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredResidents;
    let data = $$props["data"];
    let residents = data?.residents ?? [];
    let expandedId = null;
    let q = "";
    filteredResidents = residents;
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><h2 class="subpage-title">Manage Residents</h2></div> <div class="subpage-actions"><a href="/admin/dashboard/residents/create" class="add-resident-btn small-blue svelte-130yy4t">+ Add Resident</a></div></div> <div class="manage-search svelte-130yy4t"><form><div class="search-row svelte-130yy4t"><input type="search" aria-label="Search residents" placeholder="Search by name, email or car"${attr(
      "value",
      // update local array
      // toast state for create success
      // 0..100
      // remove the query param from the URL without reloading
      // noop
      // hide after a short delay to let progress reach 100
      q
    )} class="svelte-130yy4t"/> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></form></div> <h3>Residents List</h3> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="resident-list svelte-130yy4t"><!--[-->`);
    const each_array = ensure_array_like(filteredResidents);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let resident = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`resident-item ${stringify(expandedId === resident.id ? "expanded" : "")}`, "svelte-130yy4t")}><button${attr("aria-expanded", expandedId === resident.id)} class="resident-summary svelte-130yy4t"><div class="resident-name svelte-130yy4t">${escape_html(resident.name)}</div> <div class="resident-house svelte-130yy4t">${escape_html(resident.houseAddress)}</div> <div class="chev svelte-130yy4t">${escape_html(expandedId === resident.id ? "▾" : "▸")}</div></button> `);
      if (expandedId === resident.id) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="resident-details svelte-130yy4t"><div class="detail-row svelte-130yy4t"><strong>Email:</strong> ${escape_html(resident.email ?? "—")}</div> <div class="detail-row svelte-130yy4t"><strong>Phone:</strong> ${escape_html(resident.phone ?? "—")}</div> <div class="detail-row svelte-130yy4t"><strong>Car:</strong> ${escape_html(resident.carNumber ?? "—")}</div> <div class="detail-row svelte-130yy4t"><strong>Address:</strong> ${escape_html(resident.houseAddress ?? "—")}</div> <div class="detail-actions svelte-130yy4t"><button type="button" class="edit-btn svelte-130yy4t">Edit</button> <form method="POST" style="display:inline"><button type="submit" class="delete-btn svelte-130yy4t">Delete</button></form></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CR1BfO4V.js.map
