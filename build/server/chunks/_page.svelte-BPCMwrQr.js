import { _ as bind_props } from './index2-CCGG-RBZ.js';
import './exports-4vquAdf5.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './state.svelte-CKb08XUO.js';
import './attributes-CO48CUe7.js';
import './utils2-JZdwKo0Y.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let resident = data.resident;
    $$renderer2.push(`<section class="resident-detail-section svelte-1ttskn9"><button type="button" class="back-btn svelte-1ttskn9">← Back</button> <h2>Resident Details</h2> `);
    if (resident) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<ul class="resident-detail-list svelte-1ttskn9"><li class="svelte-1ttskn9"><strong>Name:</strong> ${escape_html(resident.name)}</li> <li class="svelte-1ttskn9"><strong>Email:</strong> ${escape_html(resident.email)}</li> <li class="svelte-1ttskn9"><strong>Phone:</strong> ${escape_html(resident.phone)}</li> <li class="svelte-1ttskn9"><strong>Car Number:</strong> ${escape_html(resident.carNumber)}</li> <li class="svelte-1ttskn9"><strong>House Address:</strong> ${escape_html(resident.houseAddress)}</li></ul>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="error">Resident not found.</div>`);
    }
    $$renderer2.push(`<!--]--></section>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BPCMwrQr.js.map
