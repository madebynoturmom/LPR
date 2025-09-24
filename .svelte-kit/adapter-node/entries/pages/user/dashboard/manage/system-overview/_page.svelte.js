import { c as ensure_array_like, f as bind_props } from "../../../../../../chunks/index2.js";
import { j as fallback } from "../../../../../../chunks/utils2.js";
import { e as escape_html } from "../../../../../../chunks/escaping.js";
import { a as attr } from "../../../../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let recentActivity = fallback($$props["recentActivity"], () => data.recentActivity, true);
    let activeGuestPasses = fallback($$props["activeGuestPasses"], () => data.activeGuestPasses, true);
    let activeFoodDeliveryPasses = fallback($$props["activeFoodDeliveryPasses"], () => data.activeFoodDeliveryPasses, true);
    let expandedPasses = /* @__PURE__ */ new Set();
    const isExpanded = (id) => expandedPasses.has(id);
    $$renderer2.push(`<div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.5rem;"><a href="/user/dashboard/manage" style="text-decoration:none; color:#175cd3;">← Manage</a> <h2 style="margin:0;" class="svelte-eylftl">System Overview</h2></div> <div class="recent-activity-card svelte-eylftl"><h3>Recent Activity</h3> <ul><li><strong>Active Guest Passes:</strong> ${escape_html(recentActivity.activeGuestPasses)}</li> <li><strong>Active Food Delivery Passes:</strong> ${escape_html(recentActivity.activeFoodDeliveryPasses)}</li> <li><strong>Recent Car Access:</strong> ${escape_html(recentActivity.recentCarAccess)}</li></ul></div> `);
    if (activeGuestPasses.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="active-passes-card svelte-eylftl"><h3>Your Active Guest Passes</h3> <div class="passes-list svelte-eylftl"><!--[-->`);
      const each_array = ensure_array_like(activeGuestPasses);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let pass = each_array[$$index];
        $$renderer2.push(`<div class="pass-item svelte-eylftl" role="button" tabindex="0"${attr("aria-expanded", isExpanded(pass.id))}><div class="pass-summary"><div class="pass-plate"><strong>${escape_html(pass.plateNumber)}</strong></div> <div class="pass-meta">${escape_html(pass.name ? pass.name : "")}</div></div> `);
        if (isExpanded(pass.id)) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="pass-details svelte-eylftl">`);
          if (pass.name) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="pass-detail">Name: ${escape_html(pass.name)}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (pass.phone) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="pass-detail">Phone: ${escape_html(pass.phone)}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> <div class="pass-detail">Visit: ${escape_html(new Date(pass.visitTime).toLocaleString())}</div> <div class="pass-detail">Duration: ${escape_html(pass.durationMinutes)} minutes</div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (activeFoodDeliveryPasses.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="active-passes-card svelte-eylftl"><h3>Your Active Food Delivery Passes</h3> <div class="passes-list svelte-eylftl"><!--[-->`);
      const each_array_1 = ensure_array_like(activeFoodDeliveryPasses);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let pass = each_array_1[$$index_1];
        $$renderer2.push(`<div class="pass-item svelte-eylftl" role="button" tabindex="0"${attr("aria-expanded", isExpanded(pass.id))}><div class="pass-summary"><div class="pass-plate"><strong>${escape_html(pass.plateNumber)}</strong></div> <div class="pass-meta">${escape_html(pass.name ? pass.name : "")}</div></div> `);
        if (isExpanded(pass.id)) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="pass-details svelte-eylftl">`);
          if (pass.name) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="pass-detail">Name: ${escape_html(pass.name)}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (pass.phone) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="pass-detail">Phone: ${escape_html(pass.phone)}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> <div class="pass-detail">Visit: ${escape_html(new Date(pass.visitTime).toLocaleString())}</div> <div class="pass-detail">Duration: ${escape_html(pass.durationMinutes)} minutes</div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, {
      data,
      recentActivity,
      activeGuestPasses,
      activeFoodDeliveryPasses
    });
  });
}
export {
  _page as default
};
