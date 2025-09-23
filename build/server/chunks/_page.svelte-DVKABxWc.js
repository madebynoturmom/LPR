import { $ as bind_props } from './index2-Dybjf8Ej.js';
import './exports-DY9DtolF.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './state.svelte-0-WklJ7E.js';
import './attributes-Y1rI5qy_.js';
import './utils2-JZdwKo0Y.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let resident = data.resident;
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><button type="button" class="back-btn">← Back</button> <h2 class="subpage-title">Resident Details</h2></div></div> `);
    if (resident) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<ul class="resident-detail-list"><li><strong>Name:</strong> ${escape_html(resident.name)}</li> <li><strong>Email:</strong> ${escape_html(resident.email)}</li> <li><strong>Phone:</strong> ${escape_html(resident.phone)}</li> <li><strong>Car Number:</strong> ${escape_html(resident.carNumber)}</li> <li><strong>House Address:</strong> ${escape_html(resident.houseAddress)}</li></ul>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="error">Resident not found.</div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DVKABxWc.js.map
