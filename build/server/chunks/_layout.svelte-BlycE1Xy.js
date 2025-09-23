import { V as store_get, U as head, W as attr_class, X as slot, Y as ensure_array_like, Z as unsubscribe_stores } from './index2-Dybjf8Ej.js';
import { p as page } from './stores-BNhktsyd.js';
import { w as writable } from './index-DOLwiM6w.js';
import { b as attr } from './attributes-Y1rI5qy_.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './utils2-JZdwKo0Y.js';
import './context-DXUidelg.js';
import './exports-DY9DtolF.js';
import './state.svelte-0-WklJ7E.js';

function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const sidebarOpen = writable(false);
    let navLinks = [
      {
        iconPath: "/icons/house-icon.svg",
        label: "Dashboard",
        link: "/admin/dashboard"
      },
      {
        iconPath: "/icons/users-icon.svg",
        label: "Manage",
        link: "/admin/dashboard/manage"
      },
      {
        iconPath: "/icons/bolt-icon.svg",
        label: "Settings",
        link: "/admin/dashboard/settings"
      }
    ];
    store_get($$store_subs ??= {}, "$page", page).data.user?.profilePic || "/default-profile.png";
    store_get($$store_subs ??= {}, "$page", page).data.user?.name || "Admin";
    store_get($$store_subs ??= {}, "$page", page).data.user?.role || "Administrator";
    head($$renderer2, ($$renderer3) => {
      $$renderer3.push(`<link rel="stylesheet" href="/admin/dashboard/subpage.css"/>`);
    });
    $$renderer2.push(`<div${attr_class("admin-layout", void 0, {
      "sidebar-open": store_get($$store_subs ??= {}, "$sidebarOpen", sidebarOpen)
    })}><main class="dashboard-main"><div class="dashboard-inner"><!---->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!----></div></main> <div class="mobile-bottom-bar" aria-hidden="false"><nav class="mobile-nav" aria-label="Mobile Navigation"><!--[-->`);
    const each_array = ensure_array_like(navLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let nav = each_array[$$index];
      $$renderer2.push(`<a${attr("href", nav.link)}${attr_class("", void 0, {
        "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === nav.link
      })}>`);
      if (nav.iconPath) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<img${attr("src", nav.iconPath)} alt="" class="m-icon-img" width="20" height="20"/>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="m-icon">${escape_html(nav.icon)}</span>`);
      }
      $$renderer2.push(`<!--]--> <span class="m-label">${escape_html(nav.label)}</span></a>`);
    }
    $$renderer2.push(`<!--]--></nav></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-BlycE1Xy.js.map
