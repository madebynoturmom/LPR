import { U as head, X as ensure_array_like, W as attr_class, _ as stringify, $ as bind_props } from "../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import { a as attr } from "../../../../../chunks/attributes.js";
import "../../../../../chunks/state.svelte.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let vehicles = data?.vehicles ?? [];
    let expandedId = null;
    head($$renderer2, ($$renderer3) => {
      $$renderer3.push(`<link rel="stylesheet" href="/admin/dashboard/subpage.css"/>`);
    });
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><h2 class="subpage-title">Vehicles</h2></div> <div class="subpage-actions"><a class="add-vehicle-btn" href="/admin/dashboard/vehicles/create">+ Add Vehicle</a></div></div> `);
    if (vehicles.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p style="margin-top:1rem;color:#6b7280">No vehicles yet</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="resident-list"><!--[-->`);
      const each_array = ensure_array_like(vehicles);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let vehicle = each_array[$$index];
        $$renderer2.push(`<div${attr_class(`resident-item ${stringify(expandedId === vehicle.id ? "expanded" : "")}`)}><button class="resident-summary"${attr("aria-expanded", expandedId === vehicle.id)}><div class="resident-name">${escape_html(vehicle.plateNumber)}</div> <div class="resident-house">${escape_html(vehicle.ownerName)}</div> <div class="chev">${escape_html(expandedId === vehicle.id ? "▾" : "▸")}</div></button> `);
        if (expandedId === vehicle.id) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="resident-details"><div class="detail-row"><strong>Plate:</strong> ${escape_html(vehicle.plateNumber)}</div> <div class="detail-row"><strong>Owner:</strong> ${escape_html(vehicle.ownerName)}</div> <div class="detail-row"><strong>Model:</strong> ${escape_html(vehicle.model ?? "—")}</div> <div class="detail-actions"><a class="edit-btn"${attr("href", `/admin/dashboard/vehicles/${vehicle.id}/edit`)}>Edit</a> <form method="POST" action="?/delete" style="display:inline"><input type="hidden" name="id"${attr("value", vehicle.id)}/> <button type="submit" class="delete-btn">Delete</button></form></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> <style>
	/* Accordion styles */
	.resident-list { display:flex; flex-direction:column; gap:0.75rem; margin-top:1rem; }
	.resident-item { border:1px solid #e6eef8; border-radius:10px; overflow:hidden; }
	.resident-summary { display:flex; align-items:center; width:100%; gap:0.75rem; padding:0.75rem 1rem; background:transparent; border:none; text-align:left; cursor:pointer; }
	.resident-name { flex:1; font-weight:600; }
	.resident-house { color:#6b7280; font-size:0.95rem; }
	.chev { color:#9ca3af; margin-left:0.5rem; }
	.resident-details { padding:0.75rem 1rem; background:#fff; display:flex; flex-direction:column; gap:0.5rem; }
	.detail-row { color:#374151; }
	.detail-actions { margin-top:0.5rem; display:flex; gap:0.5rem; align-items:center; }

	@media (min-width: 900px) {
		/* On larger screens, show summary as a horizontal row with fixed house column */
		.resident-summary { padding:0.75rem 1rem; }
		.resident-house { min-width:160px; text-align:right; }
	}
</style></div> `);
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
