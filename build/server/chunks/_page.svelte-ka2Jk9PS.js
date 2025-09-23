import { U as head, Y as ensure_array_like, W as attr_class, _ as stringify, $ as bind_props } from './index2-Dybjf8Ej.js';
import './exports-DY9DtolF.js';
import { b as attr } from './attributes-Y1rI5qy_.js';
import './state.svelte-0-WklJ7E.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './utils2-JZdwKo0Y.js';
import './context-DXUidelg.js';

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
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-ka2Jk9PS.js.map
