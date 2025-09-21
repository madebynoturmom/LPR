import { X as ensure_array_like, $ as bind_props } from './index2-D53USUVF.js';
import { j as escape_html } from './escaping-CItVpVa9.js';
import { a as attr } from './attributes-CgdCmHPy.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let guards = data?.guards ?? [];
    let expandedId = null;
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><h2 class="subpage-title">Manage Guards</h2></div> <div class="subpage-actions"><a href="/admin/dashboard/guards/create" class="add-guard-btn">+ Add Guard</a></div></div> <h3>Guards List</h3> `);
    if (guards.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<table class="guard-table svelte-18p1ya8"><thead class="svelte-18p1ya8"><tr class="svelte-18p1ya8"><th class="svelte-18p1ya8">Name</th><th class="svelte-18p1ya8">Phone</th><th class="svelte-18p1ya8">Guard ID</th></tr></thead><tbody class="svelte-18p1ya8">`);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--><!--[-->`);
      const each_array = ensure_array_like(guards);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let guard = each_array[$$index];
        $$renderer2.push(`<tr class="guard-summary svelte-18p1ya8"><td data-label="Name" class="svelte-18p1ya8">${escape_html(guard.name ?? "-")}</td><td data-label="Phone" class="svelte-18p1ya8">${escape_html(guard.phone ?? "-")}</td><td data-label="Guard ID" class="svelte-18p1ya8">${escape_html(guard.guardId ?? "-")}</td></tr> `);
        if (expandedId === String(guard.id)) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<tr class="guard-details svelte-18p1ya8"><td colspan="3" class="svelte-18p1ya8"><div class="resident-details" style="padding:0.75rem 0;"><div class="detail-row"><strong>Name:</strong> ${escape_html(guard.name ?? "—")}</div> <div class="detail-row"><strong>Phone:</strong> ${escape_html(guard.phone ?? "—")}</div> <div class="detail-row"><strong>Guard ID:</strong> ${escape_html(guard.guardId ?? "—")}</div> <div class="detail-actions" style="margin-top:0.5rem;"><button type="button" class="edit-btn">Edit</button> <form method="POST" action="?/delete" style="display:inline"><input type="hidden" name="id"${attr("value", guard.id)}/> <button type="submit" class="delete-btn">Delete</button></form></div></div></td></tr>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></tbody></table>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<p>No guards found.</p>`);
    }
    $$renderer2.push(`<!--]--></div></div>  `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Do-qFr_N.js.map
