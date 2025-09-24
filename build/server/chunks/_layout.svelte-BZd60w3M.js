import { s as store_get, a as attr_class, c as ensure_array_like, b as slot, u as unsubscribe_stores } from './index2-CW9yIE9Z.js';
import { p as page } from './stores-BGw6gdkl.js';
import { w as writable } from './index-CEe3a8vz.js';
import { b as attr } from './attributes-Y1rI5qy_.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './context-BatlNbRu.js';
import './utils2-JZdwKo0Y.js';
import './exports-DY9DtolF.js';
import './state.svelte-0-WklJ7E.js';

function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let userInitials;
    const sidebarOpen = writable(false);
    let navLinks = [
      { label: "Dashboard", link: "/guard/dashboard" },
      { label: "Settings", link: "/guard/dashboard/settings" }
    ];
    let userProfilePic = null;
    let userName = "Guard";
    let userRole = "Guard";
    userProfilePic = store_get($$store_subs ??= {}, "$page", page).data.user?.profilePic || null;
    userName = store_get($$store_subs ??= {}, "$page", page).data.user?.name || "Guard";
    userRole = store_get($$store_subs ??= {}, "$page", page).data.user?.role || "Guard";
    userInitials = (function() {
      const n = store_get($$store_subs ??= {}, "$page", page).data.user?.name || userName;
      const parts = String(n).trim().split(/\s+/).filter(Boolean);
      if (parts.length === 0) return "G";
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    })();
    $$renderer2.push(`<div${attr_class("guard-layout svelte-k36n70", void 0, {
      "sidebar-open": store_get($$store_subs ??= {}, "$sidebarOpen", sidebarOpen)
    })}><button class="top-toggle svelte-k36n70" aria-label="Open sidebar"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#232946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button> <button type="button"${attr_class("sidebar-backdrop svelte-k36n70", void 0, {
      "visible": store_get($$store_subs ??= {}, "$sidebarOpen", sidebarOpen)
    })} aria-label="Close sidebar" tabindex="0"></button> <aside${attr_class("sidebar svelte-k36n70", void 0, {
      "open": store_get($$store_subs ??= {}, "$sidebarOpen", sidebarOpen)
    })} aria-label="Sidebar Navigation"><div class="sidebar-content svelte-k36n70"><div class="user-profile svelte-k36n70">`);
    if (userProfilePic) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img${attr("src", userProfilePic)}${attr("alt", userName)} class="profile-pic svelte-k36n70"/>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="profile-placeholder">${escape_html(userInitials)}</div>`);
    }
    $$renderer2.push(`<!--]--> <div class="user-username svelte-k36n70">${escape_html(userName)}</div> <div class="user-role svelte-k36n70">${escape_html(userRole)}</div></div> <nav class="sidebar-nav svelte-k36n70" aria-label="Main Navigation"><!--[-->`);
    const each_array = ensure_array_like(navLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let nav = each_array[$$index];
      $$renderer2.push(`<a${attr_class("sidebar-link svelte-k36n70", void 0, {
        "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === nav.link
      })}${attr("href", nav.link)}${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname === nav.link ? "page" : void 0)}>${escape_html(nav.label)}</a>`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="sidebar-bottom svelte-k36n70"><form class="logout-form-main" method="POST" action="/logout"><button class="logout-btn-main svelte-k36n70" type="submit">Logout</button></form></div></div></aside> <main class="dashboard-main svelte-k36n70"><!---->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!----></main></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-BZd60w3M.js.map
