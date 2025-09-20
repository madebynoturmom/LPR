import { X as ensure_array_like, W as attr_class, _ as bind_props } from './index2-CCGG-RBZ.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './attributes-CO48CUe7.js';
import './utils2-JZdwKo0Y.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let { pastPasses } = data;
    $$renderer2.push(`<div class="history-page-container svelte-ztt2mk"><a href="/user/dashboard" class="back-btn svelte-ztt2mk">← Back to Dashboard</a> <h2>Pass History</h2> <p class="history-description svelte-ztt2mk">View your past guest passes and food delivery passes that have expired or been revoked.</p> `);
    if (pastPasses.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p>No past passes found.</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="history-stats svelte-ztt2mk"><div class="stat-item svelte-ztt2mk"><span class="stat-number svelte-ztt2mk">${escape_html(pastPasses.length)}</span> <span class="stat-label svelte-ztt2mk">Total Past Passes</span></div> <div class="stat-item svelte-ztt2mk"><span class="stat-number svelte-ztt2mk">${escape_html(pastPasses.filter((p) => p.reason === "revoked").length)}</span> <span class="stat-label svelte-ztt2mk">Manually Revoked</span></div> <div class="stat-item svelte-ztt2mk"><span class="stat-number svelte-ztt2mk">${escape_html(pastPasses.filter((p) => p.reason === "expired").length)}</span> <span class="stat-label svelte-ztt2mk">Expired</span></div></div> <div class="passes-container svelte-ztt2mk"><!--[-->`);
      const each_array = ensure_array_like(pastPasses);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let pass = each_array[$$index];
        $$renderer2.push(`<div${attr_class("pass-card svelte-ztt2mk", void 0, {
          "revoked": pass.reason === "revoked",
          "expired": pass.reason === "expired"
        })}><div class="pass-header svelte-ztt2mk"><div class="pass-type svelte-ztt2mk">${escape_html(pass.type === "visitors" ? "👥 Guest Pass" : "🍕 Food Delivery")}</div> <div class="pass-status">`);
        if (pass.reason === "revoked") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="status-badge revoked svelte-ztt2mk">Revoked</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<span class="status-badge expired svelte-ztt2mk">Expired</span>`);
        }
        $$renderer2.push(`<!--]--></div></div> <div class="pass-details svelte-ztt2mk"><div class="detail-row svelte-ztt2mk"><strong class="svelte-ztt2mk">Plate:</strong> ${escape_html(pass.plateNumber)}</div> `);
        if (pass.name) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="detail-row svelte-ztt2mk"><strong class="svelte-ztt2mk">Name:</strong> ${escape_html(pass.name)}</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (pass.phone) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="detail-row svelte-ztt2mk"><strong class="svelte-ztt2mk">Phone:</strong> ${escape_html(pass.phone)}</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="detail-row svelte-ztt2mk"><strong class="svelte-ztt2mk">Visit Time:</strong> ${escape_html(new Date(pass.visitTime).toLocaleString())}</div> <div class="detail-row svelte-ztt2mk"><strong class="svelte-ztt2mk">Duration:</strong> ${escape_html(pass.durationMinutes)} minutes</div> `);
        if (pass.reason === "revoked" && "revokedAt" in pass) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="detail-row svelte-ztt2mk"><strong class="svelte-ztt2mk">Revoked At:</strong> ${escape_html(new Date(pass.revokedAt).toLocaleString())}</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BdAgJ3QH.js.map
