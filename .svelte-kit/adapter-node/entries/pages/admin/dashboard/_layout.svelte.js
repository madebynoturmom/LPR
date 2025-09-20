import { V as store_get, W as attr_class, X as ensure_array_like, Y as slot, Z as unsubscribe_stores } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { w as writable } from "../../../../chunks/index.js";
import { a as attr } from "../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const sidebarOpen = writable(false);
    let navLinks = [
      { label: "Dashboard", link: "/admin/dashboard" },
      { label: "Residents", link: "/admin/dashboard/residents" },
      { label: "Guards", link: "/admin/dashboard/guards" },
      { label: "Vehicles", link: "/admin/dashboard/vehicles" },
      { label: "Admins", link: "/admin/dashboard/admins" },
      { label: "Guests", link: "/admin/dashboard/guests" },
      { label: "Events", link: "/admin/dashboard/events" },
      { label: "Settings", link: "/admin/dashboard/settings" }
    ];
    let userProfilePic = "/default-profile.png";
    let userName = "Admin";
    let userRole = "Administrator";
    userProfilePic = store_get($$store_subs ??= {}, "$page", page).data.user?.profilePic || "/default-profile.png";
    userName = store_get($$store_subs ??= {}, "$page", page).data.user?.name || "Admin";
    userRole = store_get($$store_subs ??= {}, "$page", page).data.user?.role || "Administrator";
    $$renderer2.push(`<div${attr_class("admin-layout svelte-ky8tya", void 0, {
      "sidebar-open": store_get($$store_subs ??= {}, "$sidebarOpen", sidebarOpen)
    })}><button class="top-toggle svelte-ky8tya" aria-label="Open sidebar"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#232946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button> <button type="button"${attr_class("sidebar-backdrop svelte-ky8tya", void 0, {
      "visible": store_get($$store_subs ??= {}, "$sidebarOpen", sidebarOpen)
    })} aria-label="Close sidebar" tabindex="0"></button> <aside${attr_class("sidebar svelte-ky8tya", void 0, {
      "open": store_get($$store_subs ??= {}, "$sidebarOpen", sidebarOpen)
    })} aria-label="Sidebar Navigation"><div class="sidebar-content svelte-ky8tya"><div class="user-profile svelte-ky8tya"><img${attr("src", userProfilePic)}${attr("alt", userName)} class="profile-pic svelte-ky8tya"/> <div class="user-username svelte-ky8tya">${escape_html(userName)}</div> <div class="user-role svelte-ky8tya">${escape_html(userRole)}</div></div> <nav class="sidebar-nav svelte-ky8tya" aria-label="Main Navigation"><!--[-->`);
    const each_array = ensure_array_like(navLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let nav = each_array[$$index];
      $$renderer2.push(`<a${attr_class("sidebar-link svelte-ky8tya", void 0, {
        "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === nav.link
      })}${attr("href", nav.link)}${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname === nav.link ? "page" : void 0)}>${escape_html(nav.label)}</a>`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="sidebar-bottom svelte-ky8tya"><form class="logout-form-main svelte-ky8tya" method="POST" action="/logout"><button class="logout-btn-main svelte-ky8tya" type="submit">Logout</button></form></div></div></aside> <main class="dashboard-main svelte-ky8tya"><!---->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!----></main></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
