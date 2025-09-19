import { W as ensure_array_like, _ as bind_props } from "../../../../chunks/index2.js";
import "chart.js/auto";
import { a as attr } from "../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let stats = [
      {
        label: "Residents",
        value: data.residents,
        link: "/admin/dashboard/residents"
      },
      {
        label: "Guards",
        value: data.guards,
        link: "/admin/dashboard/guards"
      },
      {
        label: "Vehicles",
        value: data.vehicles,
        link: "/admin/dashboard/vehicles"
      },
      {
        label: "Admins",
        value: data.users,
        link: "/admin/dashboard/admins"
      },
      {
        label: "Guests",
        value: data.guests,
        link: "/admin/dashboard/guests"
      },
      {
        label: "Events",
        value: data.events,
        link: "/admin/dashboard/events"
      }
    ];
    let navLinks = [
      { label: "Dashboard", link: "/admin/dashboard" },
      { label: "Residents", link: "/admin/dashboard/residents" },
      { label: "Guards", link: "/admin/dashboard/guards" },
      { label: "Vehicles", link: "/admin/dashboard/vehicles" },
      { label: "Admins", link: "/admin/dashboard/admins" },
      { label: "Guests", link: "/admin/dashboard/guests" },
      { label: "Events", link: "/admin/dashboard/events" }
    ];
    $$renderer2.push(`<div class="admin-layout svelte-169czl3"><form method="POST" action="/logout" class="logout-form svelte-169czl3"><button class="logout-btn svelte-169czl3" type="submit">Logout</button></form> <aside class="sidebar svelte-169czl3"><div class="admin-profile svelte-169czl3">`);
    if (data.adminProfilePic) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img${attr("src", data.adminProfilePic)}${attr("alt", data.adminUsername ?? "Admin")} class="profile-pic svelte-169czl3"/>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="profile-pic placeholder svelte-169czl3">${escape_html(data.adminUsername?.charAt(0)?.toUpperCase() ?? "A")}</div>`);
    }
    $$renderer2.push(`<!--]--> <div class="admin-username svelte-169czl3">${escape_html(data.adminUsername ?? "Admin")}</div></div> <nav><!--[-->`);
    const each_array = ensure_array_like(navLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let nav = each_array[$$index];
      $$renderer2.push(`<a${attr("href", nav.link)} class="sidebar-link svelte-169czl3">${escape_html(nav.label)}</a>`);
    }
    $$renderer2.push(`<!--]--></nav> <a href="/admin/dashboard/settings" class="settings-icon svelte-169czl3" title="Account Settings" aria-label="Account Settings"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#232946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8.6 5a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 16 5.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19 8.6a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15z"></path></svg></a></aside> <main class="dashboard-main svelte-169czl3"><h1 class="svelte-169czl3">Dashboard Overview</h1> <div class="stats-grid svelte-169czl3"><!--[-->`);
    const each_array_1 = ensure_array_like(stats);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let stat = each_array_1[$$index_1];
      $$renderer2.push(`<a${attr("href", stat.link)} class="stat-card svelte-169czl3"><div class="stat-value svelte-169czl3">${escape_html(stat.value)}</div> <div class="stat-label svelte-169czl3">${escape_html(stat.label)}</div></a>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="guest-graph-card svelte-169czl3"><h2 class="svelte-169czl3">Guest Passes Issued (Last 7 Days)</h2> <canvas width="600" height="220"></canvas></div></main></div>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
