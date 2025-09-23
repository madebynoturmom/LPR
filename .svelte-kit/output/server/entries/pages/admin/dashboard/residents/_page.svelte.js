import { Y as ensure_array_like, W as attr_class, _ as stringify, $ as bind_props } from "../../../../../chunks/index2.js";
import { a as attr } from "../../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredResidents;
    let data = $$props["data"];
    let residents = data?.residents ?? [];
    let expandedId = null;
    let q = "";
    filteredResidents = residents;
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><h2 class="subpage-title">Manage Residents</h2></div> <div class="subpage-actions"><a href="/admin/dashboard/residents/create" class="add-resident-btn small-blue">+ Add Resident</a></div></div> <div class="manage-search"><form><div class="search-row"><input type="search" aria-label="Search residents" placeholder="Search by name, email or car"${attr(
      "value",
      // update local array
      // toast state for create success
      // 0..100
      // remove the query param from the URL without reloading
      // noop
      // hide after a short delay to let progress reach 100
      q
    )}/> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></form></div> <h3>Residents List</h3> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="resident-list"><!--[-->`);
    const each_array = ensure_array_like(filteredResidents);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let resident = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`resident-item ${stringify(expandedId === resident.id ? "expanded" : "")}`)}><button${attr("aria-expanded", expandedId === resident.id)} class="resident-summary"><div class="resident-name">${escape_html(resident.name)}</div> <div class="resident-house">${escape_html(resident.houseAddress)}</div> <div class="chev">${escape_html(expandedId === resident.id ? "▾" : "▸")}</div></button> `);
      if (expandedId === resident.id) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="resident-details"><div class="detail-row"><strong>Email:</strong> ${escape_html(resident.email ?? "—")}</div> <div class="detail-row"><strong>Phone:</strong> ${escape_html(resident.phone ?? "—")}</div> <div class="detail-row"><strong>Car:</strong> ${escape_html(resident.carNumber ?? "—")}</div> <div class="detail-row"><strong>Address:</strong> ${escape_html(resident.houseAddress ?? "—")}</div> <div class="detail-actions"><button type="button" class="edit-btn">Edit</button> <form method="POST" style="display:inline"><button type="submit" class="delete-btn">Delete</button></form></div></div>`);
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
export {
  _page as default
};
