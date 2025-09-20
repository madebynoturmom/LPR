import { X as ensure_array_like, _ as bind_props } from "../../../../chunks/index2.js";
import { f as fallback } from "../../../../chunks/utils2.js";
import "chart.js/auto";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import { a as attr } from "../../../../chunks/attributes.js";
import "../../../../chunks/state.svelte.js";
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
        value: data.admins,
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
    let recentActivity = fallback(
      $$props["recentActivity"],
      () => ({
        activeGuestPasses: data.activeGuestPasses,
        activeFoodDeliveryPasses: data.activeFoodDeliveryPasses,
        recentCarAccess: data.recentCarAccess
      }),
      true
    );
    $$renderer2.push(`<div class="admin-layout svelte-169czl3"><main class="dashboard-main svelte-169czl3"><h1 class="dashboard-title svelte-169czl3">Dashboard Overview</h1> <div class="recent-activity-card svelte-169czl3"><h3>Recent Activity</h3> <ul><li><strong>Active Guest Passes:</strong> ${escape_html(recentActivity.activeGuestPasses)}</li> <li><strong>Active Food Delivery Passes:</strong> ${escape_html(recentActivity.activeFoodDeliveryPasses)}</li> <li><strong>Recent Car Access:</strong> ${escape_html(recentActivity.recentCarAccess)}</li></ul></div> <div class="stats-grid svelte-169czl3"><!--[-->`);
    const each_array = ensure_array_like(stats);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let stat = each_array[$$index];
      $$renderer2.push(`<a${attr("href", stat.link)} class="stat-card svelte-169czl3"><div class="stat-value">${escape_html(stat.value)}</div> <div class="stat-label">${escape_html(stat.label)}</div></a>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="guest-graph-card svelte-169czl3"><h2>Guest Passes Issued (Last 7 Days)</h2> <canvas width="600" height="220"></canvas></div> <div class="dashboard-cards-row svelte-169czl3"><a href="/admin/dashboard/vehicles" class="dashboard-card svelte-169czl3"><h2>Vehicles</h2> <p>Manage registered vehicles.</p></a> <a href="/admin/dashboard/guests" class="dashboard-card svelte-169czl3"><h2>Guest Passes</h2> <p>View and manage guest passes.</p></a> <a href="/admin/dashboard/food-delivery" class="dashboard-card svelte-169czl3"><h2>Food Delivery</h2> <p>Grant access for food delivery riders.</p></a></div></main></div>`);
    bind_props($$props, { data, recentActivity });
  });
}
export {
  _page as default
};
