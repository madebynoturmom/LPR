import { s as store_get, u as unsubscribe_stores } from "../../../../../chunks/index2.js";
import { p as page } from "../../../../../chunks/stores.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$page", page).data?.user;
    $$renderer2.push(`<div class="dashboard-container"><header class="dashboard-overview"><div class="overview-left"><div class="overview-text"><h1 class="overview-title">Settings</h1> <div class="overview-date">Application settings &amp; preferences</div></div></div></header> <section class="settings-section svelte-6y6vmx"><div class="subpage-card"><div style="margin-top:1rem; max-width:720px;"><nav style="display:flex; flex-direction:column; gap:0.5rem;"><a href="/admin/dashboard/settings/account" class="settings-list-item">Account <span class="item-arrow">›</span></a> <a href="/admin/dashboard/settings/notifications" class="settings-list-item">Notifications <span class="item-arrow">›</span></a> <a href="/admin/dashboard/settings/appearance" class="settings-list-item">Appearance <span class="item-arrow">›</span></a> <a href="/admin/dashboard/settings/privacy" class="settings-list-item">Privacy &amp; Security <span class="item-arrow">›</span></a> <a href="/admin/dashboard/settings/help" class="settings-list-item">Help and Support <span class="item-arrow">›</span></a> <a href="/admin/dashboard/settings/about" class="settings-list-item">About <span class="item-arrow">›</span></a></nav></div></div></section></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
