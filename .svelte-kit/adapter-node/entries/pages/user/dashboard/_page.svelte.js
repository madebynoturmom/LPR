import { V as store_get, X as ensure_array_like, Z as unsubscribe_stores, $ as bind_props } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { k as fallback, e as escape_html } from "../../../../chunks/escaping.js";
import { a as attr } from "../../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let data = $$props["data"];
    let recentActivity = fallback($$props["recentActivity"], () => data.recentActivity, true);
    let activeGuestPasses = fallback($$props["activeGuestPasses"], () => data.activeGuestPasses, true);
    let activeFoodDeliveryPasses = fallback($$props["activeFoodDeliveryPasses"], () => data.activeFoodDeliveryPasses, true);
    let expandedPasses = /* @__PURE__ */ new Set();
    const isExpanded = (id) => expandedPasses.has(id);
    store_get($$store_subs ??= {}, "$page", page).data?.user?.name || "Resident";
    $$renderer2.push(`<div class="dashboard-hero-page svelte-qewru5"><div class="hero-inner-page svelte-qewru5"><button class="hero-hamburger-page svelte-qewru5" aria-label="Open sidebar"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button> <h1 class="hero-title-page svelte-qewru5">Dashboard Overview</h1></div></div> <div class="recent-activity-card svelte-qewru5"><h3 class="svelte-qewru5">Recent Activity</h3> <ul class="svelte-qewru5"><li class="svelte-qewru5"><strong>Active Guest Passes:</strong> ${escape_html(recentActivity.activeGuestPasses)}</li> <li class="svelte-qewru5"><strong>Active Food Delivery Passes:</strong> ${escape_html(recentActivity.activeFoodDeliveryPasses)}</li> <li class="svelte-qewru5"><strong>Recent Car Access:</strong> ${escape_html(recentActivity.recentCarAccess)}</li></ul></div> `);
    if (activeGuestPasses.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="active-passes-card svelte-qewru5"><h3 class="svelte-qewru5">Your Active Guest Passes</h3> <div class="passes-list svelte-qewru5"><!--[-->`);
      const each_array = ensure_array_like(activeGuestPasses);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let pass = each_array[$$index];
        $$renderer2.push(`<div class="pass-item svelte-qewru5" role="button" tabindex="0"${attr("aria-expanded", isExpanded(pass.id))}><div class="pass-summary svelte-qewru5"><div class="pass-plate svelte-qewru5"><strong>${escape_html(pass.plateNumber)}</strong></div> <div class="pass-meta svelte-qewru5">${escape_html(pass.name ? pass.name : "")}</div></div> <div class="pass-actions svelte-qewru5"><button class="manage-link svelte-qewru5">Manage</button></div> `);
        if (isExpanded(pass.id)) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="pass-details svelte-qewru5">`);
          if (pass.name) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="pass-detail svelte-qewru5">Name: ${escape_html(pass.name)}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (pass.phone) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="pass-detail svelte-qewru5">Phone: ${escape_html(pass.phone)}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> <div class="pass-detail svelte-qewru5">Visit: ${escape_html(new Date(pass.visitTime).toLocaleString())}</div> <div class="pass-detail svelte-qewru5">Duration: ${escape_html(pass.durationMinutes)} minutes</div></div>`);
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
      $$renderer2.push(`<div class="active-passes-card svelte-qewru5"><h3 class="svelte-qewru5">Your Active Food Delivery Passes</h3> <div class="passes-list svelte-qewru5"><!--[-->`);
      const each_array_1 = ensure_array_like(activeFoodDeliveryPasses);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let pass = each_array_1[$$index_1];
        $$renderer2.push(`<div class="pass-item svelte-qewru5" role="button" tabindex="0"${attr("aria-expanded", isExpanded(pass.id))}><div class="pass-summary svelte-qewru5"><div class="pass-plate svelte-qewru5"><strong>${escape_html(pass.plateNumber)}</strong></div> <div class="pass-meta svelte-qewru5">${escape_html(pass.name ? pass.name : "")}</div></div> <div class="pass-actions svelte-qewru5"><button class="manage-link svelte-qewru5">Manage</button></div> `);
        if (isExpanded(pass.id)) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="pass-details svelte-qewru5">`);
          if (pass.name) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="pass-detail svelte-qewru5">Name: ${escape_html(pass.name)}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (pass.phone) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="pass-detail svelte-qewru5">Phone: ${escape_html(pass.phone)}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> <div class="pass-detail svelte-qewru5">Visit: ${escape_html(new Date(pass.visitTime).toLocaleString())}</div> <div class="pass-detail svelte-qewru5">Duration: ${escape_html(pass.durationMinutes)} minutes</div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <h3 class="quick-actions svelte-qewru5">Quick Actions</h3> <div class="dashboard-cards-row svelte-qewru5"><a href="/user/dashboard/vehicles" class="dashboard-card svelte-qewru5"><div class="card-icon svelte-qewru5">🚗</div> <h2 class="svelte-qewru5">Vehicles</h2> <p>Manage your registered vehicles.</p></a> <a href="/user/dashboard/guests" class="dashboard-card svelte-qewru5"><div class="card-icon svelte-qewru5">👤</div> <h2 class="svelte-qewru5">Guest Passes</h2> <p>View and manage your guest passes.</p></a> <a href="/user/dashboard/food-delivery" class="dashboard-card svelte-qewru5"><div class="card-icon svelte-qewru5">🍱</div> <h2 class="svelte-qewru5">Food Delivery</h2> <p>Grant access for food delivery riders.</p></a></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
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
