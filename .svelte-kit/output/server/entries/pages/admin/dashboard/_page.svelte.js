import { Y as ensure_array_like, W as attr_class, _ as stringify, $ as bind_props } from "../../../../chunks/index2.js";
import { b as ssr_context } from "../../../../chunks/context.js";
import "chart.js/auto";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { a as attr } from "../../../../chunks/attributes.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    const dateString = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    [
      {
        label: "Residents",
        value: data.residents,
        link: "/admin/dashboard/residents",
        icon: "👥"
      },
      {
        label: "Guards",
        value: data.guards,
        link: "/admin/dashboard/guards",
        icon: "🛡️"
      },
      {
        label: "Vehicles",
        value: data.vehicles,
        link: "/admin/dashboard/vehicles",
        icon: "🚗"
      },
      {
        label: "Admins",
        value: data.admins,
        link: "/admin/dashboard/admins",
        icon: "👑"
      },
      {
        label: "Guests",
        value: data.guests,
        link: "/admin/dashboard/guests",
        icon: "🎟️"
      },
      {
        label: "Events",
        value: data.events,
        link: "/admin/dashboard/events",
        icon: "📈"
      }
    ];
    const placeholderSvg = (stroke = "#ffffff") => `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
      <path d="M8 12h8" stroke="${stroke}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`;
    const quickActions = [
      // Using static SVG paths under /static/icons/ (dummy placeholders created)
      {
        title: "Add Resident",
        description: "Register a new resident",
        link: "/admin/dashboard/residents/create",
        iconPath: "/icons/add-resident.svg",
        color: "bg-blue-500"
      },
      {
        title: "Issue Guest Pass",
        description: "Create a new guest pass",
        link: "/admin/dashboard/guests/create",
        iconPath: "/icons/issue-guest.svg",
        color: "bg-green-500"
      },
      {
        title: "Register Vehicle",
        description: "Add a new vehicle",
        link: "/admin/dashboard/vehicles/create",
        iconPath: "/icons/register-vehicle.svg",
        color: "bg-purple-500"
      },
      {
        title: "View Reports",
        description: "Access system reports",
        link: "/admin/dashboard/events",
        iconPath: "/icons/view-reports.svg",
        color: "bg-orange-500"
      }
    ];
    const issuedCount = data?.guestStats ? data.guestStats.reduce((s, g) => s + (g.count || 0), 0) : 0;
    onDestroy(() => {
    });
    $$renderer2.push(`<div class="dashboard-container svelte-169czl3"><div class="compact-header svelte-169czl3"><div class="compact-left"><h1 class="compact-title svelte-169czl3">Welcome back, Admin! 👋</h1> <p class="compact-subtitle svelte-169czl3">Here's what's happening in your community today</p></div> <div class="compact-right svelte-169czl3"><div class="date svelte-169czl3">${escape_html(dateString)}</div></div></div> <section class="issued-section svelte-169czl3"><div class="issued-card svelte-169czl3"><div class="issued-left svelte-169czl3"><div class="issued-label svelte-169czl3">Issued Guest Passes (7d)</div> <div class="issued-value svelte-169czl3">${escape_html(issuedCount)}</div></div> <canvas class="issued-canvas svelte-169czl3" aria-hidden="true"></canvas></div></section> <section class="quick-actions-section svelte-169czl3"><h2 class="section-title svelte-169czl3">Quick Actions</h2> <div class="quick-actions-grid svelte-169czl3"><!--[-->`);
    const each_array = ensure_array_like(quickActions);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let action = each_array[$$index];
      $$renderer2.push(`<a${attr("href", action.link)} class="quick-action-card svelte-169czl3"><div${attr_class(`action-icon ${stringify(action.color)}`, "svelte-169czl3")}>`);
      if (action.iconSvg) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`${html(action.iconSvg)}`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (action.iconPath) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<img${attr("src", action.iconPath)} alt="" width="24" height="24" class="svelte-169czl3"/>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`${html(placeholderSvg())}`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> <div class="action-content svelte-169czl3"><h3 class="action-title svelte-169czl3">${escape_html(action.title)}</h3> <p class="action-description svelte-169czl3">${escape_html(action.description)}</p></div> <div class="action-arrow svelte-169czl3">→</div></a>`);
    }
    $$renderer2.push(`<!--]--></div></section></div>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
