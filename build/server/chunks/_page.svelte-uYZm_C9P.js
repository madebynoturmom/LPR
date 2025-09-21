import { X as ensure_array_like, W as attr_class, _ as stringify, $ as bind_props } from './index2-D53USUVF.js';
import 'chart.js/auto';
import './exports-4vquAdf5.js';
import { a as attr } from './attributes-CgdCmHPy.js';
import './state.svelte-Bg4bqYdm.js';
import { j as escape_html } from './escaping-CItVpVa9.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    const stats = [
      {
        label: "Residents",
        value: data.residents,
        link: "/admin/dashboard/residents",
        icon: "👥",
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600"
      },
      {
        label: "Guards",
        value: data.guards,
        link: "/admin/dashboard/guards",
        icon: "🛡️",
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-50",
        textColor: "text-green-600"
      },
      {
        label: "Vehicles",
        value: data.vehicles,
        link: "/admin/dashboard/vehicles",
        icon: "🚗",
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50",
        textColor: "text-purple-600"
      },
      {
        label: "Admins",
        value: data.admins,
        link: "/admin/dashboard/admins",
        icon: "👑",
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-50",
        textColor: "text-orange-600"
      },
      {
        label: "Guests",
        value: data.guests,
        link: "/admin/dashboard/guests",
        icon: "🎫",
        color: "from-pink-500 to-pink-600",
        bgColor: "bg-pink-50",
        textColor: "text-pink-600"
      },
      {
        label: "Events",
        value: data.events,
        link: "/admin/dashboard/events",
        icon: "📊",
        color: "from-indigo-500 to-indigo-600",
        bgColor: "bg-indigo-50",
        textColor: "text-indigo-600"
      }
    ];
    const quickActions = [
      {
        title: "Add Resident",
        description: "Register a new resident",
        link: "/admin/dashboard/residents/create",
        icon: "➕",
        color: "bg-blue-500 hover:bg-blue-600"
      },
      {
        title: "Issue Guest Pass",
        description: "Create a new guest pass",
        link: "/admin/dashboard/guests/create",
        icon: "🎫",
        color: "bg-green-500 hover:bg-green-600"
      },
      {
        title: "Register Vehicle",
        description: "Add a new vehicle",
        link: "/admin/dashboard/vehicles/create",
        icon: "🚗",
        color: "bg-purple-500 hover:bg-purple-600"
      },
      {
        title: "View Reports",
        description: "Access system reports",
        link: "/admin/dashboard/events",
        icon: "📈",
        color: "bg-orange-500 hover:bg-orange-600"
      }
    ];
    $$renderer2.push(`<div class="dashboard-container svelte-169czl3"><div class="welcome-section svelte-169czl3"><div class="welcome-content svelte-169czl3"><h1 class="dashboard-title svelte-169czl3">Welcome back, Admin! 👋</h1> <p class="dashboard-subtitle svelte-169czl3">Here's what's happening in your community today</p></div> <div class="date-display svelte-169czl3"><div class="date svelte-169czl3">${escape_html((/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }))}</div></div></div> <section class="quick-actions-section svelte-169czl3"><h2 class="section-title svelte-169czl3">Quick Actions</h2> <div class="quick-actions-grid svelte-169czl3"><!--[-->`);
    const each_array = ensure_array_like(quickActions);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let action = each_array[$$index];
      $$renderer2.push(`<a${attr("href", action.link)} class="quick-action-card svelte-169czl3"><div${attr_class(`action-icon ${stringify(action.color)}`, "svelte-169czl3")}>${escape_html(action.icon)}</div> <div class="action-content svelte-169czl3"><h3 class="action-title svelte-169czl3">${escape_html(action.title)}</h3> <p class="action-description svelte-169czl3">${escape_html(action.description)}</p></div> <div class="action-arrow svelte-169czl3">→</div></a>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="stats-section svelte-169czl3"><h2 class="section-title svelte-169czl3">System Overview</h2> <div class="stats-grid svelte-169czl3"><!--[-->`);
    const each_array_1 = ensure_array_like(stats);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let stat = each_array_1[$$index_1];
      $$renderer2.push(`<a${attr("href", stat.link)} class="stat-card svelte-169czl3"><div class="stat-header svelte-169czl3"><div class="stat-icon svelte-169czl3">${escape_html(stat.icon)}</div> <div class="stat-value svelte-169czl3">${escape_html(stat.value)}</div></div> <div class="stat-label svelte-169czl3">${escape_html(stat.label)}</div> <div class="stat-link svelte-169czl3">View Details →</div></a>`);
    }
    $$renderer2.push(`<!--]--></div></section> <div class="charts-activity-row svelte-169czl3"><section class="chart-section svelte-169czl3"><div class="chart-card svelte-169czl3"><div class="chart-header svelte-169czl3"><h3 class="chart-title svelte-169czl3">Guest Passes Trend</h3> <p class="chart-subtitle svelte-169czl3">Last 7 days activity</p></div> <div class="chart-container svelte-169czl3"><canvas></canvas></div></div></section> <section class="activity-section svelte-169czl3"><div class="activity-card svelte-169czl3"><div class="activity-header svelte-169czl3"><h3 class="activity-title svelte-169czl3">Recent Activity</h3> <p class="activity-subtitle svelte-169czl3">Live updates</p></div> <div class="activity-list svelte-169czl3"><div class="activity-item svelte-169czl3"><div class="activity-icon bg-green-100 text-green-600 svelte-169czl3">🎫</div> <div class="activity-content svelte-169czl3"><p class="activity-text svelte-169czl3"><strong>${escape_html(data.activeGuestPasses)}</strong> active guest passes</p> <p class="activity-time svelte-169czl3">Currently valid</p></div></div> <div class="activity-item svelte-169czl3"><div class="activity-icon bg-blue-100 text-blue-600 svelte-169czl3">🍕</div> <div class="activity-content svelte-169czl3"><p class="activity-text svelte-169czl3"><strong>${escape_html(data.activeFoodDeliveryPasses)}</strong> food delivery passes</p> <p class="activity-time svelte-169czl3">Active today</p></div></div> <div class="activity-item svelte-169czl3"><div class="activity-icon bg-purple-100 text-purple-600 svelte-169czl3">🚗</div> <div class="activity-content svelte-169czl3"><p class="activity-text svelte-169czl3">Recent vehicle access</p> <p class="activity-time svelte-169czl3">${escape_html(data.recentCarAccess)}</p></div></div></div></div></section></div></div>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-uYZm_C9P.js.map
