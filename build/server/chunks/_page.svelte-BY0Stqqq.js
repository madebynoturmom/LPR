import { X as ensure_array_like, $ as bind_props } from './index2-D53USUVF.js';
import { j as escape_html } from './escaping-CItVpVa9.js';
import './attributes-CgdCmHPy.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let events = data?.events ?? [];
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><button type="button" class="back-btn svelte-swm1bl">← Back</button> <h2 class="subpage-title">Event Logs</h2></div></div> `);
    if (events.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<table class="event-table svelte-swm1bl"><thead><tr><th class="svelte-swm1bl">Type</th><th class="svelte-swm1bl">User</th><th class="svelte-swm1bl">Details</th><th class="svelte-swm1bl">Timestamp</th></tr></thead><tbody><!--[-->`);
      const each_array = ensure_array_like(events);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let event = each_array[$$index];
        $$renderer2.push(`<tr><td class="svelte-swm1bl">${escape_html(event.type)}</td><td class="svelte-swm1bl">${escape_html(event.userName)}</td><td class="svelte-swm1bl">${escape_html(event.details)}</td><td class="svelte-swm1bl">${escape_html(event.time)}</td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<p>No event logs found.</p>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BY0Stqqq.js.map
