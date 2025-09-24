import { s as store_get, a as attr_class, c as ensure_array_like, b as slot, u as unsubscribe_stores } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { w as writable } from "../../../../chunks/index.js";
import { a as attr } from "../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const sidebarOpen = writable(false);
    let navLinks = [
      { label: "Dashboard", link: "/user/dashboard" },
      { label: "Profile", link: "/user/dashboard/profile" },
      { label: "Vehicles", link: "/user/dashboard/vehicles" },
      { label: "Guest Passes", link: "/user/dashboard/guests" },
      {
        label: "Food Delivery",
        link: "/user/dashboard/food-delivery"
      },
      { label: "Pass History", link: "/user/dashboard/history" }
    ];
    let userProfilePic = "/default-profile.png";
    let userName = "Resident";
    userProfilePic = store_get($$store_subs ??= {}, "$page", page).data.user?.profilePic || "/default-profile.png";
    userName = store_get($$store_subs ??= {}, "$page", page).data.user?.name || "Resident";
    $$renderer2.push(`<div${attr_class("admin-layout svelte-1t2o3pe", void 0, {
      "sidebar-open": store_get($$store_subs ??= {}, "$sidebarOpen", sidebarOpen)
    })}><button class="top-toggle svelte-1t2o3pe" aria-label="Open sidebar"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#232946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-1t2o3pe"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button> <button type="button"${attr_class("sidebar-backdrop svelte-1t2o3pe", void 0, {
      "visible": store_get($$store_subs ??= {}, "$sidebarOpen", sidebarOpen)
    })} aria-label="Close sidebar" tabindex="0"></button> <aside${attr_class("sidebar svelte-1t2o3pe", void 0, {
      "open": store_get($$store_subs ??= {}, "$sidebarOpen", sidebarOpen)
    })} aria-label="Sidebar Navigation"><div class="sidebar-content svelte-1t2o3pe"><div class="user-profile svelte-1t2o3pe"><img${attr("src", userProfilePic)}${attr("alt", userName)} class="profile-pic svelte-1t2o3pe"/> <div class="user-username svelte-1t2o3pe">${escape_html(userName)}</div></div> <nav class="sidebar-nav svelte-1t2o3pe" aria-label="Main Navigation"><!--[-->`);
    const each_array = ensure_array_like(navLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let nav = each_array[$$index];
      $$renderer2.push(`<a${attr_class("sidebar-link svelte-1t2o3pe", void 0, {
        "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === nav.link
      })}${attr("href", nav.link)}${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname === nav.link ? "page" : void 0)}>${escape_html(nav.label)}</a>`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="sidebar-bottom svelte-1t2o3pe"><form class="logout-form-main svelte-1t2o3pe" method="POST" action="/logout"><button class="logout-btn-main svelte-1t2o3pe" type="submit">Logout</button></form></div></div></aside> <main class="dashboard-main svelte-1t2o3pe"><!---->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!----></main></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
