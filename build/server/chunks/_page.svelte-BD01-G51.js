import { c as ensure_array_like, d as stringify, f as bind_props } from './index2-CW9yIE9Z.js';
import 'chart.js/auto';
import { b as attr } from './attributes-Y1rI5qy_.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './context-BatlNbRu.js';
import './utils2-JZdwKo0Y.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    const stats = [
      {
        label: "Residents",
        value: data.residents || 0,
        link: "/admin/dashboard/residents",
        iconPath: "/icons/system-residents.svg"
      },
      {
        label: "Guards",
        value: data.guards || 0,
        link: "/admin/dashboard/guards",
        iconPath: "/icons/system-guards.svg"
      },
      {
        label: "Vehicles",
        value: data.vehicles || 0,
        link: "/admin/dashboard/vehicles",
        iconPath: "/icons/system-vehicles.svg"
      },
      {
        label: "Admins",
        value: data.admins || 0,
        link: "/admin/dashboard/admins",
        iconPath: "/icons/system-admins.svg"
      },
      {
        label: "Guests",
        value: data.guests || 0,
        link: "/admin/dashboard/guests",
        iconPath: "/icons/system-guests.svg"
      },
      {
        label: "Events",
        value: data.events || 0,
        link: "/admin/dashboard/events",
        iconPath: "/icons/system-events.svg"
      }
    ];
    $$renderer2.push(`<div class="page-header svelte-vmizjn"><a href="/admin/dashboard/manage" class="manage-button svelte-vmizjn" aria-label="Back to Manage"><span class="manage-icon svelte-vmizjn" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></span> <span class="manage-text svelte-vmizjn">Manage</span></a> <h2 class="page-title svelte-vmizjn">System Overview</h2></div> <section class="stats-section svelte-vmizjn"><div class="stats-grid svelte-vmizjn"><!--[-->`);
    const each_array = ensure_array_like(stats);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let stat = each_array[$$index];
      $$renderer2.push(`<a${attr("href", stat.link)} class="stat-card svelte-vmizjn"><div class="stat-header svelte-vmizjn"><div class="stat-icon svelte-vmizjn">`);
      if (stat.iconPath) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<img${attr("src", stat.iconPath)}${attr("alt", `${stringify(stat.label)} icon`)} width="40" height="40" class="svelte-vmizjn"/>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`${escape_html(stat.icon)}`);
      }
      $$renderer2.push(`<!--]--></div> <div class="stat-value svelte-vmizjn">${escape_html(stat.value)}</div></div> <div class="stat-label svelte-vmizjn">${escape_html(stat.label)}</div> <div class="stat-link">View Details →</div></a>`);
    }
    $$renderer2.push(`<!--]--></div></section> <div class="charts-activity-row svelte-vmizjn"><section class="chart-section"><div class="chart-card svelte-vmizjn"><div class="chart-header"><h3 class="chart-title">Guest Passes Trend</h3> <p class="chart-subtitle">Last 7 days activity</p></div> <div class="chart-container svelte-vmizjn"><canvas></canvas></div></div></section> <section class="activity-section"><div class="activity-card svelte-vmizjn"><div class="activity-header"><h3 class="activity-title">Recent Activity</h3> <p class="activity-subtitle">Live updates</p></div> <div class="activity-list svelte-vmizjn"><div class="activity-item svelte-vmizjn"><div class="activity-icon bg-green-100 text-green-600">🎫</div> <div class="activity-content"><p class="activity-text"><strong>${escape_html(data.activeGuestPasses)}</strong> active guest passes</p> <p class="activity-time">Currently valid</p></div></div> <div class="activity-item svelte-vmizjn"><div class="activity-icon bg-blue-100 text-blue-600">🍕</div> <div class="activity-content"><p class="activity-text"><strong>${escape_html(data.activeFoodDeliveryPasses)}</strong> food delivery passes</p> <p class="activity-time">Active today</p></div></div> <div class="activity-item svelte-vmizjn"><div class="activity-icon bg-purple-100 text-purple-600">🚗</div> <div class="activity-content"><p class="activity-text">Recent vehicle access</p> <p class="activity-time">${escape_html(data.recentCarAccess)}</p></div></div></div></div></section></div>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BD01-G51.js.map
