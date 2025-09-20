import { X as ensure_array_like, _ as bind_props } from "../../../../../chunks/index2.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let guards = data?.guards ?? [];
    $$renderer2.push(`<section class="admin-section svelte-18p1ya8"><button type="button" class="back-btn svelte-18p1ya8">← Back</button> <div class="add-guard-btn-container svelte-18p1ya8"><a href="/admin/dashboard/guards/create" class="add-guard-btn svelte-18p1ya8">+ Add Guard</a></div> <h2>Manage Guards</h2> <h3>Guards List</h3> `);
    if (guards.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<table class="guard-table svelte-18p1ya8"><thead><tr><th class="svelte-18p1ya8">Name</th><th class="svelte-18p1ya8">Phone</th><th class="svelte-18p1ya8">Guard ID</th></tr></thead><tbody><!--[-->`);
      const each_array = ensure_array_like(guards);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let guard = each_array[$$index];
        $$renderer2.push(`<tr><td class="svelte-18p1ya8">${escape_html(guard.name ?? "-")}</td><td class="svelte-18p1ya8">${escape_html(guard.phone ?? "-")}</td><td class="svelte-18p1ya8">${escape_html(guard.guardId ?? "-")}</td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<p>No guards found.</p>`);
    }
    $$renderer2.push(`<!--]--></section>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
